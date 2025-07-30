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
