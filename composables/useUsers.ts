import { ref, computed } from 'vue';
import { handleGetUsers } from '~/service/users';
import type { FlatUser, User } from '~/types/user.types';

export function useUsers() {
  const rawUsers = ref<User[]>([]);
  const searchQuery = ref('');
  const pagesToShow = ref(1);
  const pageSize = 20;

  const flatUsers = computed<FlatUser[]>(() => {
    return rawUsers.value.map((user: User) => {
      const firstName = user.profile?.first_name ?? '';
      const lastName = user.profile?.last_name ?? '';
      const icon = user.profile?.avatar ?? '';

      return {
        id: user.id,
        created_at: user.created_at,
        firstName,
        lastName,
        icon,
        email: user.email,
        department_name: user.department_name,
        position_name: user.position_name,
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
