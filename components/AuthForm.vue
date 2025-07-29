<template>
  <div
    class="flex flex-col items-center justify-center m-auto w-[33vw] h-[50vw] gap-[30px]"
  >
    <h1 class="text-3xl tracking-wider">{{ title }}</h1>
    <h3>{{ caption }}</h3>

    <dynamic-form :inputs :initial-data="formData" @submit="handleSubmit" />

    <NuxtLink :to="linkTo" class="uppercase text-xs text-neutral-500">{{
      linkText
    }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import DynamicForm from '@/components/UI/DynamicForm.vue';
import type { Input } from '~/types/form.types';
import type { AuthInput } from '~/types/user.types';

const { submitHandler } = defineProps<{
  title: string;
  caption: string;
  inputs: Input[];
  submitHandler: (data: AuthInput) => Promise<unknown>;
  linkTo: string;
  linkText: string;
}>();

const formData = ref<AuthInput>({
  email: '',
  password: '',
});

const handleSubmit = async (data: AuthInput) => {
  await submitHandler(data);
};
</script>
