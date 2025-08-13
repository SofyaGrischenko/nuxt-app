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

    <dynamic-table :data="filteredSkills" :columns>
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
      :title="t('edit.skill')"
      :inputs="dialogInputs"
      :initial-data="selectedSkill"
      :update-button="isAdmin"
      @submit="handleSkillUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import DynamicDialog from '../UI/DynamicDialog.vue';
import DynamicTable from '~/components/UI/DynamicTable.vue';
import { useI18n } from 'vue-i18n';
import type { Input, Skill, UpdateSkillInput } from '~/types/form.types';

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
} = useSkills();

const isDialogVisible = ref(false);
const selectedSkill = ref<Skill | null>(null);

const columns = [
  { field: 'name', header: t('table.name'), sortable: true },
  {
    field: 'category_name',
    header: t('table.skills_category'),
    sortable: true,
  },
  {
    field: 'details',
    header: '',
    sortable: false,
  },
];

const dialogInputs = computed<Input[]>(() => [
  {
    label: 'name',
    field: 'name',
    component: 'InputText',
    props: { disabled: !isAdmin },
  },
  {
    label: 'category',
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

const showDetails = (data: Skill) => {
  selectedSkill.value = data;
  isDialogVisible.value = true;
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
  await Promise.all([getSkills(), getSkillCategories()]);
});
</script>
