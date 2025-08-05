import { handleGetUsers } from '~/service/users';
import type { User } from '~/types/user.types';

export function useUsers() {
  const users = ref<User[]>([]);
  const searchQuery = ref('');
  const pagesToShow = ref(1);
  const pageSize = 20;

  const filteredUsers = computed(() => {
    const search = searchQuery.value.trim().toLowerCase();
    return !search
      ? users.value
      : users.value.filter(
          (u) =>
            u.profile?.first_name?.toLowerCase().includes(search) ||
            u.profile?.last_name?.toLowerCase().includes(search)
        );
  });

  const employees = computed(() =>
    filteredUsers.value.slice(0, pagesToShow.value * pageSize).map((user) => ({
      id: user.id,
      firstName: user.profile?.first_name,
      lastName: user.profile?.last_name,
      icon: user.profile?.avatar,
      email: user.email,
      dep: user.department?.name,
      pos: user.position?.name,
    }))
  );

  const loadMore = () => pagesToShow.value++;

  const fetchUsers = async () => {
    const { users: fetchedUsers } = await handleGetUsers();
    if (fetchedUsers) users.value = fetchedUsers;
  };

  return {
    users,
    searchQuery,
    filteredUsers,
    employees,
    loadMore,
    fetchUsers,
  };
}
