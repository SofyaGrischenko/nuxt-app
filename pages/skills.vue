<template>
  <SkillsTable />
</template>

<script setup lang="ts">
import SkillsTable from '~/components/tables/SkillsTable.vue';
definePageMeta({
  middleware: 'auth',
});
</script>
