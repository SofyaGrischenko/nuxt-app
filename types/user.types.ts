export interface AuthInput {
  email: string;
  password: string;
}

export enum UserRole {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface UserProfileApi {
  first_name: string;
  last_name: string;
  avatar: string; 
}

export interface UserApi {
  id: string;
  created_at: string;
  email: string;
  department_name?: string;
  position_name?: string;
  role: string;
  profile?: UserProfileApi;
}

export interface User {
  id: string;
  createdAt: string;
  email: string;
  departmentName?: string;
  positionName?: string;
  role: string;
  profile?: UserProfile;
}

export type FlatUser = {
  id?: string;
  email: string;
  createdAt: string;
  departmentName?: string;
  positionName?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role?: string;
};

export interface LoginResponse {
  login: {
    user: User;
    access_token: string;
    refresh_token: string;
  } | null;
}

export interface UpdateProfileInput {
  userId: string;
  firstName: string;
  lastName: string;
}

export interface UpdateUserInput {
  userId: string;
  cvsIds?: string[];
  departmentId: string;
  positionId: string;
  role: string;
}

export interface UploadAvatarInput {
  userId: string;
  base64: string;
  size: number;
  type: string;
}
