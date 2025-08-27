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
        severity="primary"
        variant="text"
        class="w-50 h-15 uppercase hover:bg-transparent"
        @click="showCreateForm"
      >
        <i class="pi pi-plus" />
        {{ t('create.language') }}
      </Button>
    </div>

    <DynamicTable :data="filteredLanguages" :columns>
      <template #details="{ data }">
        <Button
          icon="pi pi-ellipsis-v"
          style="color: #d0d0d0"
          text
          rounded
          @click="toggleMenu($event, data)"
        />
      </template>
    </DynamicTable>
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

    <DynamicDialog
      v-model:visible="isDialogVisible"
      :title="dialogTitle"
      :inputs="dialogInputs"
      :initial-data="selectedLang"
      :update-button="isAdmin"
      :button-text
      @submit="handleSubmit"
    />
  </div>
  <Menu id="overlay_menu" ref="menu" :model="menuOptions" :popup="true" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { MenuItem } from 'primevue/menuitem';
import DynamicDialog from '../UI/DynamicDialog.vue';
import DynamicTable from '~/components/UI/DynamicTable.vue';
import type {
  BaseLanguage,
  LanguageInput,
  LanguageOtput,
} from '~/types/language.types';
import type { Input } from '~/types/form.types';

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
  deleteLanguage,
} = useLanguages();

const menu = ref();
const isDialogVisible = ref(false);
const selectedLang = ref<LanguageOtput | null>(null);

const dialogTitle = ref<string>('');
const buttonText = ref<string>('');

const menuOptions: MenuItem[] = [
  {
    label: t('edit.edit'),
    command: () => {
      if (selectedLang.value) {
        showEditForm(selectedLang.value);
      }
    },
  },
  {
    label: t('delete'),
    command: () => {
      if (selectedLang.value) {
        deleteLanguage(selectedLang.value.id);
      }
    },
  },
];

const columns = computed(() => {
  const baseColumns = [
    { field: 'name', header: t('table.name'), sortable: true },
    {
      field: 'native_name',
      header: t('table.nativeName'),
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
    label: t('table.name'),
    field: 'name',
    component: 'InputText',
    props: { disabled: !isAdmin },
  },
  {
    label: t('table.nativeName'),
    field: 'native_name',
    component: 'InputText',
    props: { disabled: !isAdmin },
  },
  {
    label: t('table.iso2'),
    field: 'iso2',
    component: 'InputText',
    props: { disabled: !isAdmin },
  },
]);

const showEditForm = (data: LanguageOtput) => {
  selectedLang.value = data;
  dialogTitle.value = t('edit.language');
  buttonText.value = t('updateButton');
  isDialogVisible.value = true;
};

const showCreateForm = () => {
  selectedLang.value = null;
  dialogTitle.value = t('create.language');
  buttonText.value = t('create.button');
  isDialogVisible.value = true;
};

const toggleMenu = (event: Event, data: LanguageOtput) => {
  selectedLang.value = data;
  menu.value.toggle(event);
};

const handleSubmit = (formData: Record<string, string>) => {
  if (selectedLang.value) {
    handleLangUpdate(formData);
  } else {
    handleCreateNewLang(formData);
  }
};

const handleCreateNewLang = async (formData: Record<string, string>) => {
  const newSkill: BaseLanguage = {
    name: formData.name,
    iso2: formData.iso2,
    native_name: formData.native_name,
  };

  await createLang(newSkill);
  isDialogVisible.value = false;
};

const handleLangUpdate = async (formData: Record<string, string>) => {
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
  try {
    await getLanguages();
  } finally {
    isLoading.value = false;
  }
});
</script>
