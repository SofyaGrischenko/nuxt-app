<template>
  <div>
    <div
      class="flex items-center border border-zinc-600 rounded-full px-4 py-2 w-full max-w-sm gap-3 mb-5"
    >
      <i class="pi pi-search" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search"
        class="bg-transparent outline-none text-white placeholder-zinc-400 w-full"
      />
    </div>
    <dynamic-table :employees :columns>
      <template #icon="{ data }">
        <img
          v-if="data.icon"
          :src="data.icon"
          :alt="data.firstName"
          class="w-10 h-10 rounded-full object-cover"
        />
        <div
          v-else
          class="w-10 h-10 rounded-full bg-neutral-500 flex items-center justify-center text-lg text-neutral-700"
        >
          {{ data.firstName?.[0] }}
        </div>
      </template>

      <template #details="{ data }">
        <Button
          icon="pi pi-arrow-right"
          text
          rounded
          @click="showDetails(data)"
        />
      </template>
    </dynamic-table>
    <div
      v-if="employees.length < filteredUsers.length"
      class="flex justify-center mt-4 mb-15"
    >
      <Button
        :label="t('table.button')"
        icon="pi pi-arrow-down"
        @click="loadMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DynamicTable from '~/components/UI/DynamicTable.vue';
import { handleGetUsers } from '~/service/users';
import type { FlatUser, User } from '~/types/user.types';

const { t } = useI18n();

const users = ref<User[]>([]);
const loading = ref(false);
const searchQuery = ref('');

const pagesToShow = ref(1);
const pageSize = 20;

const columns = [
  { field: 'icon', header: '', sortable: false },
  { field: 'firstName', header: t('tableHeaders.firstName'), sortable: true },
  { field: 'lastName', header: t('tableHeaders.lastName'), sortable: true },
  { field: 'email', header: t('tableHeaders.email'), sortable: true },
  { field: 'dep', header: t('tableHeaders.department'), sortable: true },
  { field: 'pos', header: t('tableHeaders.position'), sortable: true },
  { field: 'details', header: '', sortable: false },
];

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) {
    return users.value;
  }

  const search = searchQuery.value.toLowerCase();

  return users.value.filter((user) => {
    const firstName = user.profile?.first_name?.toLowerCase() || '';
    const lastName = user.profile?.last_name?.toLowerCase() || '';
    return firstName.includes(search) || lastName.includes(search);
  });
});

const showDetails = (data: FlatUser) => {
  console.log('click', data);
};

const employees = computed(() => {
  const end = pagesToShow.value * pageSize;

  return filteredUsers.value.slice(0, end).map((emp: User) => ({
    id: emp.id,
    firstName: emp.profile?.first_name,
    lastName: emp.profile?.last_name,
    icon: emp.profile?.avatar,
    email: emp.email,
    dep: emp.department?.name,
    pos: emp.position?.name,
  }));
});

const loadMore = () => {
  pagesToShow.value++;
};

watch(searchQuery, () => {
  pagesToShow.value = 1;
});

onMounted(async () => {
  loading.value = true;
  try {
    const data = await handleGetUsers();
    if (data.users) {
      users.value = data.users;
    }
  } catch (error) {
    console.error('failed to fetch users', error);
  } finally {
    loading.value = false;
  }
});
</script>
