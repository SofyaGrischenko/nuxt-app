<template>
  <skills-table />
</template>

<script setup lang="ts">
import SkillsTable from '~/components/SkillsTable.vue';
definePageMeta({
  middleware: 'auth',
});
</script>
