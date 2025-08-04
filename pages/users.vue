<template>
  <div>
    <p v-if="pending">LOADING...</p>
    <dynamic-table :employees :columns />
  </div>
</template>

<script setup lang="ts">
import DynamicTable from '~/components/UI/DynamicTable.vue';
import { handleGetUsers } from '~/service/users';
import type { User } from '~/types/user.types';

definePageMeta({
  middleware: 'auth',
});

const { t } = useI18n();

const users = ref<User[]>([]);
const pending = ref(false);

onMounted(async () => {
  pending.value = true;
  const data = await handleGetUsers();
  if (data.users) {
    users.value = data.users;
    console.log('MOUNTED', data.users);
  }
  pending.value = false;
});

const columns = [
  { field: 'firstName', header: t('tableHeaders.firstName') },
  { field: 'lastName', header: t('tableHeaders.lastName') },
  { field: 'email', header: t('tableHeaders.email') },
  { field: 'dep', header: t('tableHeaders.department') },
  { field: 'pos', header: t('tableHeaders.position') },
];

const employees = computed(() => {
  return users?.value.map((emp: User) => ({
    id: emp.id,
    firstName: emp.profile?.first_name,
    lastName: emp.profile?.last_name,
    icon: emp.profile?.avatar,
    email: emp.email,
    dep: emp.department?.name,
    pos: emp.position?.name,
  }));
});
</script>
