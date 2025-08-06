<template>
  <!-- <Suspense>
    <template #default> -->
  <users-table />
  <!-- </template> -->
  <!-- 
    <template #fallback> Loading... </template>
  </Suspense> -->
</template>

<script setup lang="ts">
import UsersTable from '~/components/UsersTable.vue';

// const MyAsyncComponent = defineAsyncComponent(
//   () => import()
// );

definePageMeta({
  middleware: 'auth',
});
</script>
