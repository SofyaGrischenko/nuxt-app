import { jwtDecode } from 'jwt-decode';
import {
  handleAvatarUpload,
  handleGetUserById,
  handleProfileUpdate,
  handleUserUpdate,
} from '~/service/users';
import type { FlatUser, User } from '~/types/user.types';

export const useCurrentUser = () => {
  const user = useState<User | null>('user', () => null);
  const { positions, departments } = useDetails();

  const currentUser = computed(() => user.value);

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

  const updateUser = async (
    originalData: FlatUser,
    updatedData: FlatUser,
    avatarFile: File | null
  ) => {
    const mutationPromises: Promise<unknown>[] = [];
    const userId = originalData.id;

    if (!userId) {
      console.error('User ID is missing, cannot update.');
      return;
    }

    const profileHasChanged =
      originalData.firstName !== updatedData.firstName ||
      originalData.lastName !== updatedData.lastName;

    if (profileHasChanged) {
      mutationPromises.push(
        handleProfileUpdate({
          userId,
          firstName: updatedData.firstName ?? '',
          lastName: updatedData.lastName ?? '',
        })
      );
    }

    const userDetailsHaveChanged =
      originalData.departmentName !== updatedData.departmentName ||
      originalData.positionName !== updatedData.positionName;

    if (userDetailsHaveChanged) {
      const departmentId = departments.value.find(
        (d) => d.name === updatedData.departmentName
      )?.id;
      const positionId = positions.value.find(
        (p) => p.name === updatedData.positionName
      )?.id;

      if (departmentId && positionId && updatedData.role) {

        mutationPromises.push(
          handleUserUpdate({
            userId,
            departmentId,
            positionId,
            cvsIds: [],
            role: updatedData.role,
          })
        );
      } else {
        console.error(
          'Could not find ID for new department/position or role is missing.'
        );
      }
    }

    if (avatarFile) {
      const base64 = await fileToBase64(avatarFile);
      mutationPromises.push(
        handleAvatarUpload({
          userId,
          base64,
          size: avatarFile.size,
          type: avatarFile.type,
        })
      );
    }

    if (mutationPromises.length === 0) {
      console.log('No information to update.');
      return;
    }

    try {
      await Promise.all(mutationPromises);
      console.log('User data updated');

      user.value = null;
      await fetchCurrentUser();
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  return {
    currentUser,
    fetchCurrentUser,
    updateUser,
    clearUser,
  };
};
