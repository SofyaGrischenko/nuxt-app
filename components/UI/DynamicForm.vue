<template>
  <div :class="wrapperClass || 'w-full flex flex-col gap-6'">
    <!-- <div class="w-full gap-[20px] flex flex-col"> -->
    <form-input
      v-for="input in inputs"
      :key="input.field"
      v-model="formData[input.field]"
      :label="input.label"
      :field="input.field"
      :component="input.component"
      v-bind="input.props"
    />
    <!-- </div> -->
    <div class="flex justify-center mt-4">
      <Button
        type="submit"
        variant="primary"
        :label="submitButton"
        class="w-[10rem] tracking-wider"
        @click="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from 'primevue/button';
import FormInput from './FormInput.vue';
import type { Input } from '~/types/form.types';

const { inputs, initialData, wrapperClass } = withDefaults(
  defineProps<{
    inputs: Input[];
    initialData: Record<string, string>;
    wrapperClass?: string;
  }>(),
  {
    wrapperClass: '',
  }
);

const emit = defineEmits(['submit']);

const formData = ref({ ...initialData });

const handleSubmit = async () => {
  emit('submit', formData.value);
};
</script>
