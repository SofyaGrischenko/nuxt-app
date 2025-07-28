<template>
  <login-form class="h-full"/>
</template>

<script setup lang="ts">
import LoginForm from '~/components/auth/LoginForm.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'auth',
});
</script>
