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

    <dynamic-table :data="filteredLanguages" :columns />

    <user-dialog v-model:visible="isDialogVisible" :user="null" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import DynamicTable from '~/components/UI/DynamicTable.vue';

const { t } = useI18n();
const { getLanguages, searchQuery, filteredLanguages } = useDetails();

const isDialogVisible = ref(false);

const columns = [
  { field: 'name', header: t('table.name'), sortable: true },
  {
    field: 'native_name',
    header: t('table.native_name'),
    sortable: false,
  },
  { field: 'iso2', header: t('table.iso2'), sortable: false },
];

onMounted(async () => {
  await getLanguages();
});
</script>
