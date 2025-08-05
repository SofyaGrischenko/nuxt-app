<template>
  <div class="ml-6">
    <users-table />
  </div>
</template>

<script setup lang="ts">
import UsersTable from '~/components/UsersTable.vue';

definePageMeta({
  middleware: 'auth',
});

</script>
