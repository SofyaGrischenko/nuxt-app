<template>
  <registration-form class="h-full" />
</template>

<script setup lang="ts">
import RegistrationForm from '~/components/auth/RegistrationForm.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'auth',
});
</script>
