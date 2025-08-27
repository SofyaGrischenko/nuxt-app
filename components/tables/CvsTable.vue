<template>
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
  <DynamicTable :data="tableData" :columns>
    <template #description="{ data }">
      <span class="block truncate max-w-md">
        {{ data.description }}
      </span>
    </template>

    <template #details="{}">
      <Button
        icon="pi pi-ellipsis-v"
        severity="secondary"
        text
        rounded
        class="justify-self-end"
        @click="showDetails()"
      />
    </template>
  </DynamicTable> 
</template>

<script setup lang="ts">
import type { Cv } from '~/types/cv.types';
import DynamicTable from '../UI/DynamicTable.vue';

const { t } = useI18n();
const { fetchCvs } = useCvs();
const cvs = useState<Cv[]>('cvs');

const searchQuery = ref('');

const columns = [
  { field: 'name', header: t('table.name'), sortable: true },
  { field: 'description', header: t('table.description'), sortable: false },
  { field: 'employee', header: t('table.employee'), sortable: true },
  { field: 'details', header: '', sortable: false },
];

const tableData = computed(() => {
  if (!cvs.value) {
    return [];
  }

  return cvs.value.map((cv) => {
    let emp;
    if (cv.user) {
      emp = cv.user.email;
    }

    return {
      id: cv.id,
      name: cv.name,
      description: cv.description,
      employee: emp,
    };
  });
});

const showDetails = () => {
  console.log('show details');
};

onMounted(async () => {
  await fetchCvs();
});
</script>
