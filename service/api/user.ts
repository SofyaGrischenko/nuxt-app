import { provideApolloClient } from '@vue/apollo-composable';

import GET_USERS from '@/graphql/users/users.query.gql';
import SIGN_UP from '@/graphql/users/users.mutations.gql';
import type { AuthInput } from '~/types/user.types';

export const handleGetUsers = async () => {
  const { data } = await useAsyncQuery(GET_USERS);
  console.log('app data', data);
};

export const handleCreateUser = async (authInput: AuthInput) => {
  const client = useApolloClient().client;

  try {
    provideApolloClient(client);

    const { mutate } = useMutation(SIGN_UP);
    const result = await mutate({ auth: authInput });

    const accessToken = result?.data.signup.access_token;
    const refreshToken = result?.data.signup.refresh_token;

    if (accessToken && refreshToken) {
      useCookie('access_token').value = accessToken;
      useCookie('refresh_token').value = refreshToken;  
      return;
    }
  } catch (e) {
    console.error('signup failed', e);
  }
};
