<template>
  <div class="ml-6">
    <div
      class="flex items-center border border-zinc-600 rounded-full px-4 py-2 w-full max-w-sm gap-3 mb-5"
    >
      <i class="pi pi-search" />
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('search')"
        class="bg-transparent outline-none text-white placeholder-zinc-400 w-full"
      >
    </div>

    <dynamic-table :data="employees" :columns>
      <template #icon="{ data }">
        <img
          v-if="data.icon"
          :src="data.icon"
          :alt="data.firstName"
          class="w-10 h-10 rounded-full object-cover"
        >
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
    <user-dialog v-model:visible="isDialogVisible" :user="selectedUser" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import UserDialog from '@/components/UserDialog.vue';
import DynamicTable from '~/components/UI/DynamicTable.vue';
import { useUsers } from '~/composables/useUsers';
import type { FlatUser } from '~/types/user.types';

const { t } = useI18n();
const { getDepartments, getPositions } = useDetails();
const { employees, searchQuery, filteredUsers, loadMore, fetchUsers } =
  useUsers();

const selectedUser = ref<FlatUser | null>(null);
const isDialogVisible = ref(false);

const columns = [
  { field: 'icon', header: '', sortable: false },
  { field: 'firstName', header: t('table.firstName'), sortable: true },
  { field: 'lastName', header: t('table.lastName'), sortable: true },
  { field: 'email', header: t('table.email'), sortable: true },
  { field: 'departmentName', header: t('table.department'), sortable: true },
  { field: 'positionName', header: t('table.position'), sortable: true },
  { field: 'details', header: '', sortable: false },
];

const showDetails = (data: FlatUser) => {
  selectedUser.value = data;
  isDialogVisible.value = true;
};

onMounted(async () => {
  await Promise.all([fetchUsers(), getPositions(), getDepartments()]);
});
</script>
