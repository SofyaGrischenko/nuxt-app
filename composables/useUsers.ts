import { ref, computed } from 'vue';
import { handleGetUsers } from '~/service/users';
import type { FlatUser, User } from '~/types/user.types';

export function useUsers() {
  const rawUsers = ref<User[]>([]);
  const searchQuery = ref('');
  const pagesToShow = ref(1);
  const pageSize = 20;

  const flatUsers = computed<FlatUser[]>(() => {
    return rawUsers.value.map((user) => {
      const firstName = user.profile?.firstName ?? '';
      const lastName = user.profile?.lastName ?? '';

      return {
        id: user.id,
        created_at: user.created_at,
        firstName,
        lastName,
        icon: user.profile?.avatarUrl,
        email: user.email,
        department: user.department,
        position: user.position,
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
        user.firstName?.includes(search) || user.lastName?.includes(search)
    );
  });

  const employees = computed(() =>
    filteredUsers.value.slice(0, pagesToShow.value * pageSize)
  );

  const loadMore = () => pagesToShow.value++;

  const fetchUsers = async () => {
    const { users: fetchedUsers } = await handleGetUsers();
    if (fetchedUsers) {
      rawUsers.value = fetchedUsers;
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
}
