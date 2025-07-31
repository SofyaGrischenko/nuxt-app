import { useApolloQuery } from '~/composables/useApolloClient';
import { LOG_IN } from '~/graphql/auth/query';
import type { AuthInput, LoginResponse } from '~/types/user.types';

export const handleLogin = async (auth: AuthInput) => {
  const { data, fetch } = useApolloQuery<LoginResponse>(LOG_IN, { auth });
  await fetch()
  return data.value?.login;
};
