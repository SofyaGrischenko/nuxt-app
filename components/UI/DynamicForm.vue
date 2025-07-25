<template>
  <div class="w-full gap-[20px] flex flex-col">
    <form-input
      v-for="input in inputs"
      :key="input.field"
      v-model="formData[input.field]"
      :label="input.label"
      :field="input.field"
      :component="input.component"
      v-bind="input.props"
    />
  </div>

  <Button
    variant="primary"
    label="submit"
    class="w-[10rem] rounded-[50px] tracking-wider"
    @click="handleSubmit"
  />
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import FormInput from './FormInput.vue';
import type { Input } from '~/types/form.types';

const { inputs } = defineProps<{ inputs: Input[] }>();

const formData = reactive<Record<string, string>>(
  inputs.reduce((acc, input) => {
    acc[input.field] = '';
    return acc;
  }, {} as Record<string, string>)
);

const handleSubmit = async () => {
  console.log('Form Submitted!', formData);

  // await handleCreateUser(formData);
};
</script>
