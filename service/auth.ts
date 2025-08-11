import { useApolloQuery } from '~/composables/useApolloClient';
import { SIGN_UP, UPDATE_TOKEN } from '~/graphql/auth/mutations';
import { LOG_IN } from '~/graphql/auth/query';
import type { AuthInput, LoginResponse } from '~/types/user.types';

export const handleLogin = async (auth: AuthInput) => {
  const { data, fetch } = useApolloQuery<LoginResponse>(LOG_IN, { auth });
  await fetch();
  return data.value?.login;
};


export const handleSignup = async (authInput: AuthInput) => {
  const { data, mutate } = useApolloMutation(SIGN_UP);

  await mutate({ auth: authInput });
  return data?.value.signup ?? null;
};


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
