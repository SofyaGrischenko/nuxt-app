<template>
  <div class="ml-6">
    <div class="flex justify-between">
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
      <Button
        v-if="isAdmin"
        severity="contrast"
        variant="text"
        class="w-50 h-15 uppercase hover:bg-transparent"
        @click="showCreateForm"
      >
        <i class="pi pi-plus" />
        Create Language
      </Button>
    </div>

    <dynamic-table :data="filteredLanguages" :columns>
      <template #details="{ data }">
        <Button
          icon="pi pi-arrow-right"
          text
          rounded
          @click="showEditForm(data)"
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
      :title="dialogTitle"
      :inputs="dialogInputs"
      :initial-data="selectedLang"
      :update-button="isAdmin"
      :button-text
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import DynamicDialog from '../UI/DynamicDialog.vue';
import DynamicTable from '~/components/UI/DynamicTable.vue';
import { useI18n } from 'vue-i18n';
import type {
  CreateLanguageInput,
  Input,
  LanguageInput,
  LanguageOtput,
} from '~/types/form.types';

const { t } = useI18n();
const { isAdmin } = useCurrentUser();
const {
  searchQuery,
  languages,
  filteredLanguages,
  getLanguages,
  loadMore,
  updateLanguage,
  createLang,
} = useLanguages();

const isDialogVisible = ref(false);
const selectedLang = ref<LanguageOtput | null>(null);

const dialogTitle = ref<string>('');
const buttonText = ref<string>('');

const columns = computed(() => {
  const baseColumns = [
    { field: 'name', header: t('table.name'), sortable: true },
    {
      field: 'native_name',
      header: t('table.native_name'),
      sortable: false,
    },
    { field: 'iso2', header: t('table.iso2'), sortable: false },
  ];
  if (isAdmin.value) {
    baseColumns.push({
      field: 'details',
      header: '',
      sortable: false,
    });
  }
  return baseColumns;
});

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

const showEditForm = (data: LanguageOtput) => {
  selectedLang.value = data;
  dialogTitle.value = t('edit.skill');
  buttonText.value = t('updateButton');
  isDialogVisible.value = true;
};

const showCreateForm = () => {
  selectedLang.value = null;
  dialogTitle.value = 'Create new skill';
  buttonText.value = 'Create';
  isDialogVisible.value = true;
};

const handleSubmit = (formData: Record<string, any>) => {
  if (selectedLang.value) {
    handleLangUpdate(formData);
  } else {
    handkeCreateNewLang(formData);
  }
};

const handkeCreateNewLang = async (formData: Record<string, any>) => {
  const newSkill: CreateLanguageInput = {
    name: formData.name,
    iso2: formData.iso2,
    native_name: formData.native_name,
  };

  await createLang(newSkill);
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
