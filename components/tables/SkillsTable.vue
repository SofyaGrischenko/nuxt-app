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
        {{ t('createSkill') }}
      </Button>
    </div>

    <dynamic-table :data="filteredSkills" :columns>
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
      v-if="skills.length < filteredSkills.length"
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
      :initial-data="selectedSkill"
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
  CreateSkillInput,
  Input,
  Skill,
  UpdateSkillInput,
} from '~/types/form.types';

const { t } = useI18n();
const { isAdmin } = useCurrentUser();
const {
  skills,
  filteredSkills,
  skillCategories,
  searchQuery,
  loadMore,
  getSkills,
  getSkillCategories,
  updateSkill,
  createSkill,
} = useSkills();

const isDialogVisible = ref(false);
const selectedSkill = ref<Skill | null>(null);

const dialogTitle = ref<string>('');
const buttonText = ref<string>('');

const columns = computed(() => {
  const baseColumns = [
    { field: 'name', header: t('table.name'), sortable: true },
    {
      field: 'category_name',
      header: t('table.skills_category'),
      sortable: true,
    },
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
    label: t('labels.category'),
    field: 'category_name',
    component: 'Select',
    props: {
      disabled: !isAdmin,
      options: skillCategories.value,
      optionLabel: 'name',
      optionValue: 'name',
    },
  },
]);

const showEditForm = (data: Skill) => {
  dialogTitle.value = t('edit.skill');
  buttonText.value = t('updateButton');
  selectedSkill.value = data;
  isDialogVisible.value = true;
};

const showCreateForm = () => {
  selectedSkill.value = null;
  dialogTitle.value = t('createSkill');
  buttonText.value = t('createButton');
  isDialogVisible.value = true;
};

const handleSubmit = (formData: Record<string, any>) => {
  if (selectedSkill.value) {
    handleSkillUpdate(formData);
  } else {
    handkeCreateNewSkill(formData);
  }
};

const handkeCreateNewSkill = async (formData: Record<string, any>) => {
  const category = skillCategories.value.find(
    (c) => c.name === formData.category_name
  );
  if (!category) return;

  const newSkill: CreateSkillInput = {
    name: formData.name,
    categoryId: category.id,
  };

  await createSkill(newSkill);
};

const handleSkillUpdate = async (formData: Record<string, any>) => {
  if (!selectedSkill.value) return;

  const category = skillCategories.value.find(
    (c) => c.name === formData.category_name
  );
  if (!category) return;

  const skillToUpdate: UpdateSkillInput = {
    skillId: selectedSkill.value.id,
    name: formData.name,
    categoryId: category.id,
  };

  await updateSkill(skillToUpdate);
  isDialogVisible.value = false;
};

onMounted(async () => {
  try {
    await Promise.all([getSkills(), getSkillCategories()]);
  } finally {
    isLoading.value = false;
  }
});
</script>
