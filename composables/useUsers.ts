import { ref, computed } from 'vue';
import { handleGetUsers } from '~/service/users';
import type { FlatUser, User } from '~/types/user.types';

export const useUsers = () => {
  const rawUsers = ref<User[]>([]);
  const searchQuery = ref('');
  const pagesToShow = ref(1);
  const pageSize = 20;

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
        user.firstName?.toLowerCase().includes(search) || //need to check type  first_name || firstName
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

  return {
    rawUsers,
    searchQuery,
    employees,
    filteredUsers,
    loadMore,
    fetchUsers,
  };
};
