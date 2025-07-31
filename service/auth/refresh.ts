import { useApolloQuery } from '~/composables/useApolloClient';
import { UPDATE_TOKEN } from '~/graphql/auth/mutations';

export const handleRefreshToken = async () => {
  try {
    const { data } = useApolloQuery(UPDATE_TOKEN);

    console.log('handleRefreshToken', data.value);
    
    return data?.value.updateToken?.access_token;
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};
