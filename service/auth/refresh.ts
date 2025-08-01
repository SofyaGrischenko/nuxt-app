import { UPDATE_TOKEN } from '~/graphql/auth/mutations';

export const handleRefreshToken = async () => {
  try {
    const apolloClient = useApolloClient();
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_TOKEN,
    });

    return data?.updateToken;
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};
