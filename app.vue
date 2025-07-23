<template>
  <div>
    <my-button />
  </div>
</template>

<script setup lang="ts">
import MyButton from './components/MyButton.vue';
import { getUsers } from './service/user';

onMounted(() => {
  getUsers();
});
</script>
