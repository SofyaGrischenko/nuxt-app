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
      v-if="skillsToShow.length < filteredSkills.length"
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
      :title="'Edit skill'"
      :inputs
      :initial-data="selectedSkill"
    />
  </div>
</template>

<script setup lang="ts">
import DynamicDialog from '../UI/DynamicDialog.vue';
import DynamicTable from '~/components/UI/DynamicTable.vue';
import { useI18n } from 'vue-i18n';
import type { Input, Skill } from '~/types/form.types';

const { t } = useI18n();
const { getSkills, searchQuery, skillsToShow, filteredSkills, loadMore } =
  useDetails();

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

const inputs = ref<Input[]>([
  {
    label: 'name',
    field: 'name',
    component: 'InputText',
  },
  {
    label: 'category',
    field: 'category_name',
    component: 'InputText',
  },
]);

const showDetails = (data: Skill) => {
  selectedSkill.value = data;
  isDialogVisible.value = true;
};

onMounted(async () => {
  await getSkills();
});
</script>
