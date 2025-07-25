<template>
  <div
    class="flex flex-col items-center justify-center m-auto w-[33vw] h-[50vw] gap-[30px]"
  >
    <h1 class="text-3xl tracking-wider">Register now</h1>
    <h3>Welcome! Sign up to continue</h3>
    <dynamic-form :inputs />
    <p class="uppercase text-xs text-neutral-500">i have an account</p>
  </div>
</template>

<script setup lang="ts">
import DynamicForm from '@/components/UI/DynamicForm.vue';

const inputs = shallowRef([
  {
    type: 'text',
    label: 'Email',
    field: 'email',
    component: 'InputText',
  },
  {
    type: 'password',
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
