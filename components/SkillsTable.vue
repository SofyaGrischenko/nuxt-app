<template>
  <div class="ml-6">
    <!-- <div
      class="flex items-center border border-zinc-600 rounded-full px-4 py-2 w-full max-w-sm gap-3 mb-5"
    >
      <i class="pi pi-search" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search"
        class="bg-transparent outline-none text-white placeholder-zinc-400 w-full"
      />
    </div> -->

    <dynamic-table :data="skills" :columns>
      <!-- <template #icon="{ data }">
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
      </template> -->

      <template #details="{ data }">
        <Button icon="pi pi-arrow-right" text rounded />
        <!-- @click="showDetails(data)" -->
      </template>
    </dynamic-table>
    <!-- <div
      v-if="employees.length < filteredUsers.length"
      class="flex justify-center mt-4 mb-15"
    >
      <Button
        :label="t('table.button')"
        icon="pi pi-arrow-down"
        @click="loadMore"
      />
    </div> -->
    <!-- <user-dialog v-model:visible="isDialogVisible" :user="selectedUser" /> -->
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import DynamicTable from '~/components/UI/DynamicTable.vue';

const { t } = useI18n();
const { skills, getSkills } = useDetails();

const columns = [
  { field: 'name', header: t('table.skills_name'), sortable: true },
  {
    field: 'category_name',
    header: t('table.skills_category'),
    sortable: true,
  },
  { field: 'details', header: '', sortable: false },
];

onMounted(async () => {
  await Promise.all([getSkills()]);
});
</script>
