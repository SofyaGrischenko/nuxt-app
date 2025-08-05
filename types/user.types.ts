export interface AuthInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  login: {
    access_token: string;
    refresh_token: string;
  } | null;
}

export interface User {
  id: string;
  email: string;
  department?: {
    name: string;
  };
  position?: {
    name: string;
  };
  profile?: {
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export interface FlatUser {
  id?: string;
  email: string;
  department?: string;
  position?: string;
  firstName?: string;
  lastName?: string;
  icon?: string;
  role?: string;
}
