import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  ApolloLink,
  Observable,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { defineNuxtPlugin, useCookie } from '#app';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const httpLink = createHttpLink({
    uri: config.public.GRAPHQL_ENDPOINT as string,
    credentials: 'include',
  });

  const authLink = new ApolloLink((operation, forward) => {
    const accessToken = useCookie<string | null>('access_token');

    if (accessToken.value) {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken.value}`,
        },
      }));
    }
    return forward(operation);
  });

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors?.some((e) => e.extensions?.code === 'UNAUTHENTICATED')) {
      return new Observable((observer) => {
        const refreshAndRetry = async () => {
          try {
            await useAuth().refresh();
            forward(operation).subscribe(observer);
          } catch (err) {
            observer.error(err);
          }
        };

        refreshAndRetry();
      });
    }
  });

  const apolloClient = new ApolloClient({
    link: from([authLink, httpLink, errorLink]),
    cache: new InMemoryCache(),
  });

  return {
    provide: {
      apolloClient,
    },
  };
});
