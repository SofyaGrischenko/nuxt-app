import { gql } from '@apollo/client/core';

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      department {
        name
      }
      position {
        name
      }
    }
  }
`;
