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
  avatarUrl: string;
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  department?: string;
  position?: string;
  role: string;
  profile?: UserProfile;
}
// export type FlatUser = Omit<User, 'profile'> & UserProfile;

export type FlatUser = {
  id?: string;
  email: string;
  created_at: string;
  department?: string;
  position?: string;
  firstName?: string;
  lastName?: string;
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
