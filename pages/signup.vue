<template>
  <AuthForm
    title="Register now"
    caption="Welcome! Sign up to continue"
    :inputs
    :submit-handler="handleCreateUser"
    link-to="/login"
    link-text="i have an account"
    class="h-full"
  />
</template>

<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue';
import { handleCreateUser } from '~/service/api/user';

definePageMeta({
  middleware: 'auth',
  layout: 'auth',
});

const inputs = ref([
  {
    label: 'Email',
    field: 'email',
    component: 'InputText',
  },
  {
    label: 'Password',
    field: 'password',
    component: 'Password',
    props: {
      toggleMask: true,
      feedback: false,
    },
  },
]);
</script>
