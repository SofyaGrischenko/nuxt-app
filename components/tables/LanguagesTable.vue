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

    <dynamic-table :data="filteredLanguages" :columns>
      <template #details="{ data }">
        <Button
          icon="pi pi-arrow-right"
          text
          rounded
          @click="showDetails(data)"
        />
      </template>
    </dynamic-table>

    <dynamic-dialog
      v-model:visible="isDialogVisible"
      :title="t('edit.language')"
      :inputs
      :initial-data="selectedSkill"
      disabled-button
    />
  </div>
</template>

<script setup lang="ts">
import DynamicDialog from '../UI/DynamicDialog.vue';
import DynamicTable from '~/components/UI/DynamicTable.vue';
import { useI18n } from 'vue-i18n';
import type { Input, Language } from '~/types/form.types';

const { t } = useI18n();
const { getLanguages, searchQuery, filteredLanguages } = useDetails();

const isDialogVisible = ref(false);
const selectedSkill = ref<Language | null>(null);

const columns = [
  { field: 'name', header: t('table.name'), sortable: true },
  {
    field: 'native_name',
    header: t('table.native_name'),
    sortable: false,
  },
  { field: 'iso2', header: t('table.iso2'), sortable: false },
  {
    field: 'details',
    header: '',
    sortable: false,
  },
];

const inputs = ref<Input[]>([
  {
    label: 'Name',
    field: 'name',
    component: 'InputText',
    props: { disabled: true },
  },
  {
    label: 'Native name',
    field: 'native_name',
    component: 'InputText',
    props: { disabled: true },
  },
  {
    label: 'ISO2',
    field: 'iso2',
    component: 'InputText',
    props: { disabled: true },
  },
]);

const showDetails = (data: Language) => {
  selectedSkill.value = data;
  isDialogVisible.value = true;
};

onMounted(async () => {
  await getLanguages();
});
</script>
