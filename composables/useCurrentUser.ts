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
        user.value = response.user;
      }
    } catch (error) {
      console.error('Failed to fetch current user', error);
      clearUser();
    }
  };

  const updateUser = async (
    originalData: FlatUser,
    updatedData: FlatUser,
    avatarFile: File | null
  ) => {
    const mutationPromises: Promise<any>[] = [];
    const userId = originalData.id;

    if (!userId) {
      console.error('user`s id is missing');
      return;
    }

    if (
      updatedData.first_name &&
      updatedData.last_name &&
      (updatedData.first_name !== originalData.first_name ||
        updatedData.last_name !== originalData.last_name)
    ) {
      mutationPromises.push(
        handleProfileUpdate({
          userId,
          first_name: updatedData.first_name,
          last_name: updatedData.last_name,
        })
      );
    }
    if (
      userId &&
      updatedData?.role &&
      (updatedData.department_name !== originalData.department_name ||
        updatedData.position_name !== originalData.position_name)
    ) {
      console.log('DEP ARR', departments.value);

      const departmentId = departments.value.find(
        (d) => d.name === updatedData.department_name
      )?.id;
      const positionId = positions.value.find(
        (p) => p.name === updatedData.position_name
      )?.id;

      console.log('ID', departmentId, positionId);
      
      if (departmentId && positionId) {
        mutationPromises.push(
          handleUserUpdate({
            userId,
            departmentId,
            positionId,
            cvsIds: [''],
            role: updatedData?.role,
          })
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
      console.log('no info to update');
      return;
    }

    try {
      await Promise.all(mutationPromises);
      console.log('updated successfully');
      await fetchCurrentUser();
    } catch (e) {
      console.error('failed to update user info', e);
    }
  };

  return {
    currentUser,
    fetchCurrentUser,
    updateUser,
  };
};
