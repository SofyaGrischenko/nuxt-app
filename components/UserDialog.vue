<template>
  <Dialog
    v-model:visible="dialogVisible"
    modal
    :header="'Update user'"
    class="md:w-[600px]"
    :style="{ width: '70vw' }"
  >
    <dynamic-form
      v-if="user"
      :inputs="formInputs"
      :initial-data="formInitialData"
      :submit-button="'save'"
      :wrapper-class="'grid grid-cols-1 md:grid-cols-2 gap-6'"
      @submit="handleFormSubmit"
    />
    <template #footer>
      <div class="flex w-[50%]">
        <Button
          label="Cancel"
          severity="secondary"
          variant="outlined"
          class="w-full"
        />
        <Button label="Save" severity="secondary" class="w-full" />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
import Button from 'primevue/button';
import DynamicForm from './UI/DynamicForm.vue';
import type { Input } from '~/types/form.types';
import type { FlatUser } from '~/types/user.types';

const { visible, user } = defineProps<{
  visible: boolean;
  user: FlatUser | null;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'submit', data: Record<string, string>): void;
}>();

// const { t } = useI18n();

const dialogVisible = computed({
  get: () => visible,
  set: (val) => emit('update:visible', val),
});

const formInputs = computed<Input[]>(() => [
  {
    field: 'email',
    label: 'email',
    component: 'InputText',
    props: { disabled: true },
  },
  {
    label: 'password',
    field: 'password',
    component: 'Password',
    props: {
      toggleMask: true,
      feedback: false,
    },
  },
  {
    field: 'firstName',
    label: 'first name',
    component: 'InputText',
    props: {
      disabled: true,
    },
  },
  {
    field: 'lastName',
    label: 'last name',
    component: 'InputText',
    props: { disabled: true },
  },
  {
    field: 'department',
    label: 'department',
    component: 'Select',
    props: { disabled: true },
  },
  {
    field: 'position',
    label: 'position',
    component: 'Select',
    props: { disabled: false },
  },
  {
    field: 'role',
    label: 'position',
    component: 'InputText',
    props: { disabled: true },
  },
]);

const formInitialData = computed(() => ({
  firstName: user?.firstName || '',
  lastName: user?.lastName || '',
  email: user?.email || '',
  department: user?.department || '',
  position: user?.position || '',
}));

const handleFormSubmit = (formData: Record<string, string>) => {
  emit('submit', formData);
  emit('update:visible', false);
};
</script>
