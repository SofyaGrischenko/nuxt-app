import { gql } from '@apollo/client/core';

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(user: $input) {
      id
      email
      role
      department_name
      position_name
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfileInput($input: UpdateProfileInput!) {
    updateProfile(profile: $input) {
      first_name
      last_name
      avatar
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation UploadAvatar($input: UploadAvatarInput!) {
    uploadAvatar(avatar: $input)
  }
`;
