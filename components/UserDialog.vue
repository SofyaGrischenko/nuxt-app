<template>
  <Dialog
    v-model:visible="dialogVisible"
    :header="'Update user'"
    modal
    class="md:w-[600px]"
  >
    <DynamicForm
      v-if="user"
      :inputs="formInputs"
      :initial-data="formInitialData"
      :submit-button="'save'"
      :wrapper-class="'grid grid-cols-1 md:grid-cols-2 gap-6'"
      @submit="handleFormSubmit"
    />
  </Dialog>
</template>

<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
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
    field: 'email',
    label: 'email',
    component: 'InputText',
    props: { disabled: true },
  },
  {
    field: 'dep',
    label: 'department',
    component: 'InputText',
    props: { disabled: true },
  },
  {
    field: 'pos',
    label: 'position',
    component: 'InputText',
    props: { disabled: true },
  },
]);

const formInitialData = computed(() => ({
  firstName: user?.firstName || '',
  lastName: user?.lastName || '',
  email: user?.email || '',
  dep: user?.dep || '',
  pos: user?.pos || '',
}));

const handleFormSubmit = (formData: Record<string, string>) => {
  emit('submit', formData);
  emit('update:visible', false);
};
</script>
