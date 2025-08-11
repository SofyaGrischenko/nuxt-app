<template>
  <languages-table />
</template>

<script setup lang="ts">
import LanguagesTable from '~/components/tables/LanguagesTable.vue';
definePageMeta({
  middleware: 'auth',
});
</script>
