import {
  UPDATE_AVATAR,
  UPDATE_PROFILE,
  UPDATE_USER,
} from '~/graphql/users/mutations';
import { GET_USER_BY_ID, GET_USERS } from '~/graphql/users/query';
import type {
  UpdateProfileInput,
  UpdateUserInput,
  UploadAvatarInput,
} from '~/types/user.types';

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
    const { data, fetch } = useApolloQuery(GET_USER_BY_ID, { userId });
    await fetch();

    return data?.value;
  } catch (error) {
    console.error('failed to get user by id', error);
  }
};

export const handleUserUpdate = async (userInfo: UpdateUserInput) => {
  try {
    const { data, mutate } = useApolloMutation(UPDATE_USER);

    await mutate({ userInfo });

    return data?.value;
  } catch (error) {
    console.error('failed to update user', error);
  }
};

export const handleProfileUpdate = async (input: UpdateProfileInput) => {
  try {
    const { mutate } = useApolloMutation(UPDATE_PROFILE);
    const { data } = await mutate({ input });
    return data;
  } catch (error) {
    console.error('Failed to update profile', error);
  }
};

export const handleAvatarUpload = async (input: UploadAvatarInput) => {
  try {
    const { mutate } = useApolloMutation(UPDATE_AVATAR);
    const { data } = await mutate({ input });
    return data;
  } catch (error) {
    console.error('Failed to upload avatar', error);
    throw error;
  }
};
