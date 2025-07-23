// import apolloClient from '~/plugins/apollo';
import GET_USERS from '@/graphql/users/users.query.gql';

export const getUsers = async () => {
  // const response = await apolloClient.query();

  // const query = gql`
  //   query {
  //     users {
  //       id
  //       created_at
  //       email
  //     }
  //   }
  // `;

  const { data } = await useAsyncQuery(GET_USERS);
  console.log('app data', data);
};
