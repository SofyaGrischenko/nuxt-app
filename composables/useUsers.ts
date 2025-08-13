import { ref, computed } from 'vue';
import {
  handleAvatarUpload,
  handleGetUserById,
  handleGetUsers,
  handleProfileUpdate,
  handleUserUpdate,
} from '~/service/users';
import type { FlatUser, User } from '~/types/user.types';

export const useUsers = () => {
  const rawUsers = ref<User[]>([]);
  const searchQuery = ref('');
  const pagesToShow = ref(1);
  const pageSize = 20;
  const selectedUser = ref<User | null>(null);

  const { positions, departments } = useDetails();
  const { error, warning, success } = useToastNotification();

  const flatUsers = computed<FlatUser[]>(() => {
    return rawUsers.value.map((user: User) => {
      const firstName = user.profile?.firstName ?? '';
      const lastName = user.profile?.lastName ?? '';
      const icon = user.profile?.avatar ?? '';

      return {
        id: user.id,
        createdAt: user.createdAt,
        firstName,
        lastName,
        icon,
        email: user.email,
        departmentName: user.departmentName,
        positionName: user.positionName,
        role: user.role,
      };
    });
  });

  const filteredUsers = computed(() => {
    const search = searchQuery.value.trim().toLowerCase();
    if (!search) {
      return flatUsers.value;
    }
    return flatUsers.value.filter(
      (user) =>
        user.firstName?.toLowerCase().includes(search) ||
        user.lastName?.toLowerCase().includes(search)
    );
  });

  const employees = computed(() =>
    filteredUsers.value.slice(0, pagesToShow.value * pageSize)
  );

  const loadMore = () => pagesToShow.value++;

  const fetchUsers = async () => {
    const data = await handleGetUsers();

    if (data) {
      rawUsers.value = data;
    }
  };

  const fetchOneUser = async (id: string) => {
    selectedUser.value = null;
    const data = await handleGetUserById(id);

    if (data) {
      selectedUser.value = data;
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
      warning('No information to update');
      return;
    }

    try {
      await Promise.all(mutationPromises);
      success('Profile updated');

      await fetchOneUser(userId);
    } catch (e) {
      console.error('Failed to update user', e);
      error('Failed to update profile');
    }
  };

  return {
    selectedUser,
    rawUsers,
    searchQuery,
    employees,
    filteredUsers,
    loadMore,
    fetchUsers,
    fetchOneUser,
    updateUser,
  };
};
