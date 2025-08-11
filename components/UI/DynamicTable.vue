<template>
  <div>
    <DataTable :value="data" table-style="min-width: 50rem">
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :sortable="col.sortable"
      >
        <template #body="slotProps">
          <slot :name="col.field" :data="slotProps.data">
            {{ slotProps.data[col.field] }}
          </slot>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
// import type { FlatUser } from '~/types/user.types';
import type { ColumnType } from '~/types/table.types';

const { data, columns } = defineProps<{
  data: any;
  columns: ColumnType[];
}>();
</script>
