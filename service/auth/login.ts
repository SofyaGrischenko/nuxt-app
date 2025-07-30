import { LOG_IN } from '@/graphql/users/users.query.gql';
import type { AuthInput, LoginResponse } from '~/types/user.types';

export const handleLogin = async (authInput: AuthInput) => {
  const { data, error } = await useAsyncQuery<LoginResponse>(LOG_IN, {
    auth: authInput,
  });

  if (error.value) {
    throw new Error(error.value.message);
  }

  return data.value?.login ?? null;
};
