import {
  ApolloClient,
  InMemoryCache,
  Observable,
  createHttpLink,
  from,
} from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { ref, computed } from 'vue';
import type {
  DocumentNode,
  MutationOptions,
  NormalizedCacheObject,
  OperationVariables,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

enum operationName {
  LOG_IN = 'LOG_IN',
  SIGN_UP = 'SIGN_UP',
  UPDATE_TOKEN = 'RefreshToken',
}

export const useApolloClient = () => {
  if (!apolloClient) {
    const httpLink = createHttpLink({
      uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    });

    const authLink = setContext((graphqlRequest, { headers }) => {
      const { refreshToken } = useAuth();
      const accessToken = useCookie('access_token');

      if (graphqlRequest.operationName === operationName.UPDATE_TOKEN) {
        return {
          headers: {
            ...headers,
            ...(refreshToken.value && {
              authorization: `Bearer ${refreshToken.value}`,
            }),
          },
        };
      }

      return {
        headers: {
          ...headers,
          ...(accessToken.value && {
            authorization: `Bearer ${accessToken.value}`,
          }),
        },
      };
    });

    const errorLink = onError(({ graphQLErrors, operation, forward }) => {
      const { refresh, logout } = useAuth();

      if (
        graphQLErrors?.some((e) => e.extensions?.code === 'UNAUTHENTICATED')
      ) {
        refresh();


        if (operation.operationName === operationName.UPDATE_TOKEN) {
          console.error('Refresh token is invalid or expired');
          logout();
          return;
        }

          return new Observable((observer) => {
            const refreshAndRetry = async () => {
              try {
                await refresh();
                forward(operation).subscribe(observer);
              } catch (err) {
                observer.error(err);
              }
            };

            refreshAndRetry();
          });
      }
    });

    apolloClient = new ApolloClient({
      link: from([errorLink, authLink, httpLink]),
      cache: new InMemoryCache({resultCaching: false}),
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
        },
        query: {
          errorPolicy: 'all',
        },
      },
    });
  }

  return apolloClient;
};

export const useApolloQuery = <T>(
  query: DocumentNode,
  variables?: OperationVariables
) => {
  const client = useApolloClient();
  const data = ref<T | null>(null);
  const loading = ref(true);
  const error = ref<Error | null>(null);

  const executeQuery = async (vars?: OperationVariables) => {
    try {
      loading.value = true;
      error.value = null;
      const result = await client.query<T, OperationVariables>({
        query,
        variables: vars || variables,
      });
      data.value = result.data;
    } catch (err) {
      error.value = err as Error;
    } finally {
      loading.value = false;
    }
  };

  return {
    data: computed(() => data.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    fetch: executeQuery,
  };
};

export const useApolloMutation = <T>(mutation: DocumentNode) => {
  const client = useApolloClient();
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const mutate = async (
    variables?: OperationVariables,
    options?: Omit<
      MutationOptions<T, OperationVariables>,
      'mutation' | 'variables'
    >
  ) => {
    try {
      loading.value = true;
      error.value = null;
      const result = await client.mutate<T, OperationVariables>({
        mutation,
        variables,
        ...options,
      });
      data.value = result.data;
      return result;
    } catch (err) {
      error.value = err as Error;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    data: computed(() => data.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    mutate,
  };
};
