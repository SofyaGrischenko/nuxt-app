<template>
  <div>
    <DataTable
      :value="employees"
      table-style="min-width: 50rem overflow-scroll"
    >
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable"
      />
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import type { FlatUser } from '~/types/user.types';
import type { ColumnType } from '~/types/table.types';

const { employees, columns } = defineProps<{
  employees: FlatUser[] | null;
  columns: ColumnType[];
}>();
</script>
