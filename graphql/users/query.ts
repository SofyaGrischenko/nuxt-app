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
      department_name
      position_name
      role
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GET_USER_BY_ID($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      profile {
        first_name
        last_name
        avatar
      }
      department_name
      position_name
      role
    }
  }
`;
