<template>
  <div
    class="flex flex-col items-center justify-center m-auto w-[33vw] h-[50vw] gap-[30px]"
  >
    <h1 class="text-3xl tracking-wider">{{ title }}</h1>
    <h3>{{ caption }}</h3>

    <dynamic-form
      v-model="formData"
      :inputs
      :submit-button
      @submit="handleSubmit"
    />

    <Button
      type="submit"
      variant="primary"
      :label="submitButton"
      class="w-[10rem] tracking-wider"
      @click="handleSubmit"
    />

    <NuxtLink :to="linkTo" class="uppercase text-xs text-neutral-500">{{
      linkText
    }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import DynamicForm from '@/components/UI/DynamicForm.vue';
import { NuxtLink } from '#components';
import type { Input } from '~/types/form.types';
import type { AuthInput } from '~/types/user.types';

const { submitHandler } = defineProps<{
  title: string;
  caption: string;
  inputs: Input[];
  linkTo: string;
  linkText: string;
  submitButton: string;
  submitHandler: (data: AuthInput) => Promise<unknown>;
}>();

const formData = ref<AuthInput>({
  email: '',
  password: '',
});

const handleSubmit = async () => {
  try {
    await submitHandler(formData.value);
  } catch (error) {
    console.error('authh failed', error);
  }
};
</script>
