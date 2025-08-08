import { GET_USER_BY_ID, GET_USERS } from '~/graphql/users/query';

export const handleGetUsers = async () => {
  try {
    const { data, fetch } = useApolloQuery(GET_USERS);
    await fetch();

    return data?.value;
  } catch (error) {
    console.error('failed to get users', error);
  }
};

export const handleGetUserById = async (userId: string) => {
  try {
    console.log(userId);

    const { data, fetch } = useApolloQuery(GET_USER_BY_ID, { userId });
    await fetch();

    console.log('RESPONSE', data);

    return data?.value;
  } catch (error) {
    console.error('failed to get user by id', error);
  }
};
