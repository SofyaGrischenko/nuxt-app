export interface AuthInput {
  email: string;
  password: string;
}

export enum UserRole {
  EMPLOYEE = 'employee',
  ADMIN = 'admin',
}

export interface UserProfile {
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  department_name?: string;
  position_name?: string;
  role: string;
  profile?: UserProfile;
}
// export type FlatUser = Omit<User, 'profile'> & UserProfile;

export type FlatUser = {
  id?: string;
  email: string;
  created_at: string;
  department_name?: string;
  position_name?: string;
  first_name?: string;
  last_name?: string;
  avatarUrl?: string;
  role?: string;
  // Add an index signature
  // [key: string]: string |  undefined;
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
  first_name: string;
  last_name: string;
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
