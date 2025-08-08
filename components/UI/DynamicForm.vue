<template>
  <div :class="wrapperClass || 'w-full flex flex-col gap-6'">
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
</template>

<script setup lang="ts">
import FormInput from './FormInput.vue';
import type { Input } from '~/types/form.types';

const props = withDefaults(
  defineProps<{
    inputs: Input[];
    modelValue: Record<string, any>;
    wrapperClass?: string;
  }>(),
  {
    wrapperClass: '',
  }
);
const { inputs, wrapperClass, modelValue } = props;
const emit = defineEmits(['update:modelValue']);

const formData = computed({
  get() {
    return modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});
</script>
