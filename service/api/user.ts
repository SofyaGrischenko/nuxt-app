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
    const data = await mutate({ auth: authInput });

    console.log('signup', data);
  } catch (e) {
    console.error('signup failed', e);
  }
};
