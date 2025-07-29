<template>
  <AuthForm
    title="Welcome back"
    caption="Hello again! Log in to continue"
    :inputs
    :submit-handler="handleLogin"
    link-to="/signup"
    link-text="Forgot password"
    class="h-full"
  />
</template>

<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue';
import { handleLogin } from '~/service/api/user';

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
