import { jwtDecode } from 'jwt-decode';
import {
  // handleAvatarUpload,
  handleGetUserById,
  // handleProfileUpdate,
  // handleUserUpdate,
} from '~/service/users';
import type { User } from '~/types/user.types';

export const useCurrentUser = () => {
  const user = useState<User | null>('user', () => null);

  const currentUser = computed(() => user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  const clearUser = () => {
    user.value = null;
    useAuth().logout();
  };

  const fetchCurrentUser = async () => {
    if (user.value) {
      return;
    }

    try {
      const accessToken = useCookie('access_token');
      if (!accessToken.value) {
        return;
      }

      const decoded = jwtDecode(accessToken.value);
      const userId = decoded.sub as string;

      if (userId) {
        const response = await handleGetUserById(userId);
        if (response) {
          user.value = response;
        }
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      clearUser();
    }
  };

  return {
    currentUser,
    isAdmin,
    fetchCurrentUser,
    clearUser,
  };
};
