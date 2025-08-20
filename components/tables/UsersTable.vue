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
      />
    </div>

    <dynamic-table :data="employees" :columns>
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
    <dynamic-dialog
      v-if="selectedUser"
      v-model:visible="isDialogVisible"
      :title="t('edit.profile')"
      :inputs="dialogFormInputs"
      :initial-data="selectedUser"
      :button-text="t('updateButton')"
      :wrapper-class="'grid grid-cols-1 md:grid-cols-2 gap-6'"
      @submit="handleProfileUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import DynamicDialog from '../UI/DynamicDialog.vue';
import DynamicTable from '~/components/UI/DynamicTable.vue';
import { useUsers } from '~/composables/useUsers';
import type { FlatUser } from '~/types/user.types';
import type { Input } from '~/types/form.types';

const { t } = useI18n();
const { currentUser } = useCurrentUser();
const { getDepartments, getPositions, positions, departments } = useDetails();
const {
  employees,
  searchQuery,
  filteredUsers,
  loadMore,
  fetchUsers,
  updateUser,
} = useUsers();

const menu = ref();
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

const dialogFormInputs = computed<Input[]>(() => [
  {
    field: 'email',
    label: t('labels.email'),
    component: 'InputText',
    props: {
      disabled: true,
    },
  },
  {
    field: 'password',
    label: t('labels.password'),
    component: 'Password',
    props: {
      placeholder: '**********',
      disabled: true,
    },
  },
  {
    field: 'firstName',
    label: t('labels.first_name'),
    component: 'InputText',
  },
  {
    field: 'lastName',
    label: t('labels.last_name'),
    component: 'InputText',
  },
  {
    field: 'departmentName',
    label: t('labels.department'),
    component: 'Select',
    props: {
      options: departments.value,
      optionLabel: 'name',
      optionValue: 'name',
    },
  },
  {
    field: 'positionName',
    label: t('labels.position'),
    component: 'Select',
    props: {
      options: positions.value,
      optionLabel: 'name',
      optionValue: 'name',
    },
  },
  {
    field: 'role',
    label: t('labels.role'),
    component: 'InputText',
    props: {
      disabled: true,
    },
  },
]);

const handleProfileUpdate = async (formData: Record<string, any>) => {
  const updatedData = formData as FlatUser;

  if (!selectedUser.value) return;
  await updateUser(selectedUser.value, updatedData, null);

  isDialogVisible.value = false;
  selectedUser.value = null;
};

const showDetails = (data: FlatUser) => {
  if (currentUser.value?.id === data.id) {
    isDialogVisible.value = true;
    selectedUser.value = data;
  } else {
    navigateTo(`/users/${data.id}/profile`);
  }
};

const toggleMenu = (event: Event) => {
  menu.value.toggle(event);
};

onMounted(async () => {
  try {
    await Promise.all([fetchUsers(), getPositions(), getDepartments()]);
  } finally {
    isLoading.value = false;
  }
});
</script>
