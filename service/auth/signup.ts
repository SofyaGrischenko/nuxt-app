import { useApolloMutation } from '~/composables/useApolloClient';
import { SIGN_UP } from '~/graphql/auth/mutations';
import type { AuthInput } from '~/types/user.types';

export const handleSignup = async (authInput: AuthInput) => {
  const { data, mutate } = useApolloMutation(SIGN_UP);

  await mutate({ auth: authInput });
  return data?.value.signup ?? null;
};
