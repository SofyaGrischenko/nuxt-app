<template>
  <div :class="wrapperClass || 'w-full flex flex-col gap-6'">
    <FormInput
      v-for="input in inputs"
      :key="input.field"
      :model-value="modelValue[input.field]"
      :label="input.label"
      :field="input.field"
      :component="input.component"
      v-bind="input.props"
      @update:model-value="onUpdate(input.field, $event)"
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

const emit = defineEmits(['update:modelValue']);

const onUpdate = (field: string, value: unknown) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value,
  });
};
</script>
