<template>
  <CvsTable />
</template>

<script setup lang="ts">
import CvsTable from '~/components/tables/CvsTable.vue';
definePageMeta({
  middleware: 'auth',
});
</script>
