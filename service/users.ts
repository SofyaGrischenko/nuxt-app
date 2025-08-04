import { GET_USERS } from '~/graphql/users/query';

export const handleGetUsers = async () => {
  try {
    const { data, fetch } = useApolloQuery(GET_USERS);
    await fetch();

    return data?.value;
  } catch (error) {
    console.error('failed to get users', error);
  }
};
