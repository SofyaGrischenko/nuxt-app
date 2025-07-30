import { UPDATE_TOKEN } from '@/graphql/users/users.mutations.gql';

export const handleRefreshToken = async (token: string) => {
  const { $apolloClient } = useNuxtApp();

  try {
    const result = await $apolloClient.mutate({
      mutation: UPDATE_TOKEN,
      context: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    return result?.data?.updateToken?.access_token;
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};
