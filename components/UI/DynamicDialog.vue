<template>
  <Dialog
    v-model:visible="dialogVisible"
    modal
    :header="title"
    class="md:w-[600px]"
    :style="{ width: '50vw' }"
  >
    <dynamic-form v-model="data" :inputs />
    <template #footer>
      <div class="flex w-[50%] min-w-[250px] gap-5">
        <Button
          label="Cancel"
          severity="secondary"
          variant="outlined"
          class="w-full"
          @click="closeForm()"
        />
        <Button
          label="Delete"
          severity="secondary"
          variant="outlined"
          class="w-full"
          @click="closeForm()"
        />
        <Button
          label="update"
          severity="primary"
          class="w-full"
          @click="closeForm()"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog';
import DynamicForm from './DynamicForm.vue';
import type { Input } from '~/types/form.types';

const { inputs, visible, initialData, title } = defineProps<{
  title: string;
  visible: boolean;
  inputs: Input[];
  initialData: object | null;
}>();

const data = ref({});

const dialogVisible = computed({
  get: () => visible,
  set: (val) => emit('update:visible', val),
});

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
}>();

const closeForm = () => {
  emit('update:visible', false);
};

watch(
  () => initialData,
  (newData) => {
    if (newData) {
      data.value = { ...newData };
    } else {
      data.value = {};
    }
  },
  { immediate: true }
);
</script>
