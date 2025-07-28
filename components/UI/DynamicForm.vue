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
    type="submit"
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

const { inputs, initialData } = defineProps<{
  inputs: Input[];
  initialData: Record<string, string>;
}>();

const emit = defineEmits(['submit']);

const formData = ref({ ...initialData });

const handleSubmit = async () => {
  emit('submit', { ...formData });
};
</script>
