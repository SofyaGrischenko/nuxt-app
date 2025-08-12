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

    <dynamic-table :data="filteredSkills" :columns />
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
    <user-dialog v-model:visible="isDialogVisible" :user="null" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import DynamicTable from '~/components/UI/DynamicTable.vue';

const { t } = useI18n();
const { getSkills, searchQuery, skillsToShow, filteredSkills, loadMore } =
  useDetails();

const isDialogVisible = ref(false);

const columns = [
  { field: 'name', header: t('table.name'), sortable: true },
  {
    field: 'category_name',
    header: t('table.skills_category'),
    sortable: true,
  }
];

onMounted(async () => {
  await getSkills();
});
</script>
