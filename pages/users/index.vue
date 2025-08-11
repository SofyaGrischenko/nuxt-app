<template>
  <users-table />
</template>

<script setup lang="ts">
import UsersTable from '~/components/tables/UsersTable.vue';
definePageMeta({
  middleware: 'auth',
});
</script>
