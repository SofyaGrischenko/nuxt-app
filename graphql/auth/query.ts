import { gql } from '@apollo/client/core';

export const LOG_IN = gql`
  query LOG_IN($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
      }
      access_token
      refresh_token
    }
  }
`;
