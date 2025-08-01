import { navigateTo, useCookie } from '#app';
import { handleLogin } from '@/service/auth/login';
import { handleRefreshToken } from '@/service/auth/refresh';
import { handleSignup } from '~/service/auth/signup';
import type { AuthInput } from '~/types/user.types';

export const useAuth = () => {
  const accessToken = useCookie<string | null>('access_token', {
    maxAge: 60 * 15,
    sameSite: 'lax',
    secure: false,
  });

  const refreshToken = useCookie<string | null>('refresh_token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: false,
  });

  const isLoggedIn = computed(() => !!accessToken.value);

  const login = async (auth: AuthInput) => {
    try {
      const tokens = await handleLogin(auth);

      if (tokens?.access_token && tokens?.refresh_token) {
        accessToken.value = tokens.access_token;
        refreshToken.value = tokens.refresh_token;
        return navigateTo('/users');
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

    const apolloClient = useApolloClient();
    apolloClient.clearStore().catch((error) => {
      console.error('Failed to clear Apollo cache on logout:', error);
    });
    return navigateTo('/login');
  };

  const signup = async (auth: AuthInput) => {
    try {
      const tokens = await handleSignup(auth);

      if (tokens?.access_token && tokens?.refresh_token) {
        accessToken.value = tokens.access_token;
        refreshToken.value = tokens.refresh_token;
        return navigateTo('/users');
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
