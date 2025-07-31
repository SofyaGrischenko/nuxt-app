import { gql } from '@apollo/client/core';

export const GET_USERS = gql`
query getUsers {
  users {
    id
  }
}`


