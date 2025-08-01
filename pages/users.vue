<template>
  <div>users page</div>
</template>

<script setup lang="ts">
import { handleGetUsers } from '~/service/users';
definePageMeta({
  middleware: 'auth',
});

onMounted(() => handleGetUsers());
</script>
