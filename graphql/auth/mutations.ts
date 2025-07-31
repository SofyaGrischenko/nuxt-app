import { gql } from '@apollo/client/core';

export const SIGN_UP = gql`
  mutation signUp($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
      }
      access_token
      refresh_token
    }
  }
`;

export const UPDATE_TOKEN = gql`
  mutation RefreshToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`;
