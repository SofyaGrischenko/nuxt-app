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
    <div
      v-if="languages.length < filteredLanguages.length"
      class="flex justify-center mt-4 mb-15"
    >
      <Button
        :label="t('table.button')"
        icon="pi pi-arrow-down"
        @click="loadMore"
      />
    </div>

    <dynamic-dialog
      v-model:visible="isDialogVisible"
      :title="t('edit.language')"
      :inputs="dialogInputs"
      :initial-data="selectedLang"
      :update-button="isAdmin"
      @submit="handleLangUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import DynamicDialog from '../UI/DynamicDialog.vue';
import DynamicTable from '~/components/UI/DynamicTable.vue';
import { useI18n } from 'vue-i18n';
import type { Input, LanguageInput, LanguageOtput } from '~/types/form.types';

const { t } = useI18n();
const { isAdmin } = useCurrentUser();
const {
  searchQuery,
  languages,
  filteredLanguages,
  getLanguages,
  loadMore,
  updateLanguage,
} = useLanguages();

const isDialogVisible = ref(false);
const selectedLang = ref<LanguageOtput | null>(null);

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

const dialogInputs = computed<Input[]>(() => [
  {
    label: 'Name',
    field: 'name',
    component: 'InputText',
    props: { disabled: !isAdmin },
  },
  {
    label: 'Native name',
    field: 'native_name',
    component: 'InputText',
    props: { disabled: !isAdmin },
  },
  {
    label: 'ISO2',
    field: 'iso2',
    component: 'InputText',
    props: { disabled: !isAdmin },
  },
]);

const showDetails = (data: LanguageOtput) => {
  selectedLang.value = data;
  isDialogVisible.value = true;
};

const handleLangUpdate = async (formData: Record<string, any>) => {
  if (!selectedLang.value) return;

  const langToUpdate: LanguageInput = {
    languageId: selectedLang.value.id,
    name: formData.name,
    iso2: formData.iso2,
    native_name: formData.native_name,
  };

  await updateLanguage(langToUpdate);
  isDialogVisible.value = false;
};

onMounted(async () => {
  await getLanguages();
});
</script>
