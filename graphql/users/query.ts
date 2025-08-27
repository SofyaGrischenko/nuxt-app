import { gql } from '@apollo/client/core';

export const GET_USERS = gql`
  query GET_ALL_USERS {
    users {
      id
      email
      profile {
        id
        full_name
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
        id
        full_name
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
