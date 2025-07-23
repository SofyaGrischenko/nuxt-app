import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const httpLink = createHttpLink({
    uri: config.public.graphqlEndpoint as string,
  });

  const authLink = setContext((_, { headers }) => {
    const token = useCookie<string | null>('token').value;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  nuxtApp.provide('apolloClient', apolloClient);
});
