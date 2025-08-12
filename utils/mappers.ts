import type {
  UpdateProfileInput,
  User,
  UserApi,
} from '~/types/user.types';

export const mapApiToUser = (user: UserApi): User => {
  return {
    id: user.id,
    createdAt: user.created_at,
    email: user.email,
    departmentName: user.department_name,
    positionName: user.position_name,
    role: user.role,
    profile: user.profile
      ? {
          firstName: user.profile.first_name,
          lastName: user.profile.last_name,
          avatar: user.profile.avatar,
        }
      : undefined,
  };
};

export const mapProfile = (user: UpdateProfileInput) => {
  return {
    userId: user.userId,
    first_name: user.firstName,
    last_name: user.lastName,
  };
};