<template>
  <div
    class="flex flex-col items-center justify-center m-auto w-[33vw] h-[50vw] gap-[30px]"
  >
    <h1 class="text-3xl tracking-wider">Register now</h1>
    <h3>Welcome! Sign up to continue</h3>

    <dynamic-form :inputs :initial-data="formData" @submit="handleSubmit" />

    <NuxtLink to="/login" class="uppercase text-xs text-neutral-500"
      >i have an account</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import DynamicForm from '@/components/UI/DynamicForm.vue';
import { handleCreateUser } from '~/service/api/user';
import type { AuthInput } from '~/types/user.types';

const inputs = shallowRef([
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

const formData = ref<AuthInput>({
  email: '',
  password: '',
});

const handleSubmit = async (data: AuthInput) => {
  await handleCreateUser(data);
};
</script>
