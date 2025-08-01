import { GET_USERS } from "~/graphql/users/query";

export const handleGetUsers = async () => {
  const { data, fetch } = useApolloQuery(GET_USERS);
  await fetch()
  console.log('USERS', data.value);
};
