<template>
  <FloatLabel variant="on">
    <component
      :is="componentMap[component]"
      :id="field"
      v-model="model"
      v-bind="$attrs"
      class="w-full"
    />
    <label :for="field">{{ label }}</label>
  </FloatLabel>
</template>

<script setup lang="ts">
const model = defineModel<string>();
defineProps<{ label: string; field: string; component: string }>();

const componentMap: Record<string, Component> = {
  InputText: defineAsyncComponent(() => import('primevue/inputtext')),
  Password: defineAsyncComponent(() => import('primevue/password')),
};
</script>
