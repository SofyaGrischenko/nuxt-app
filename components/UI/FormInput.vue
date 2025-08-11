<template>
  <FloatLabel variant="on">
    <component
      :is="componentMap[component]"
      :id="field"
      v-model="modelValue"
      v-bind="$attrs"
      class="w-full"
    />
    <label :for="field">{{ label }}</label>
  </FloatLabel>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

defineProps<{ label: string; field: string; component: string }>();
const modelValue = defineModel<string | null>();

const componentMap: Record<string, Component> = {
  InputText: defineAsyncComponent(() => import('primevue/inputtext')),
  Password: defineAsyncComponent(() => import('primevue/password')),
  Select: defineAsyncComponent(() => import('primevue/select')),
};
</script>
