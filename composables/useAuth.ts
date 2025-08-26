import { navigateTo, useCookie } from '#app';
import { handleLogin, handleRefreshToken, handleSignup } from '@/service/auth';
import type { AuthInput, User } from '~/types/user.types';

export const useAuth = () => {
  const accessToken = useCookie<string | null>('access_token', {
    maxAge: 60 * 60 * 12,
    sameSite: 'lax',
    secure: false,
  });

  const refreshToken = useCookie<string | null>('refresh_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: false,
  });

  const localePath = useLocalePath();
  const user = useState<User | null>('user');

  const isLoggedIn = computed(() => !!accessToken.value);

  const login = async (auth: AuthInput) => {
    try {
      const response = await handleLogin(auth);

      if (response?.access_token && response?.refresh_token) {
        accessToken.value = response.access_token;
        refreshToken.value = response.refresh_token;
        return navigateTo(localePath('/users'));
      } else {
        throw new Error('Wrong login or password');
      }
    } catch (e) {
      console.error('Login failed:', e);
      throw e;
    }
  };

  const refresh = async () => {
    if (!refreshToken.value) {
      return;
    }

    try {
      const newTokens = await handleRefreshToken();

      if (!newTokens) {
        throw new Error('returned no new token.');
      }
      accessToken.value = newTokens.access_token;
      refreshToken.value = newTokens.refresh_token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
      throw error;
    }
  };

  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    user.value = null;
    return navigateTo('/login');
  };

  const signup = async (auth: AuthInput) => {
    try {
      const response = await handleSignup(auth);

      if (response?.access_token && response?.refresh_token) {
        accessToken.value = response.access_token;
        refreshToken.value = response.refresh_token;

        return navigateTo(localePath('/users'));
      } else {
        throw new Error('failed to signup');
      }
    } catch (e) {
      console.error('Signup failed', e);
      throw e;
    }
  };

  return {
    login,
    logout,
    refresh,
    signup,
    accessToken,
    refreshToken,
    isLoggedIn,
  };
};
