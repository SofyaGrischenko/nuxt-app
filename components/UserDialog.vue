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
      v-model="formInitialData"
      :inputs="formInputs"
      :submit-button="'save'"
      :wrapper-class="'grid grid-cols-1 md:grid-cols-2 gap-6'"
      @submit="handleFormSubmit"
    />
    <template #footer>
      <div class="flex w-[50%] gap-5">
        <Button
          label="Cancel"
          severity="secondary"
          variant="outlined"
          class="w-full"
          @click="closeForm()"
        />
        <Button label="Update" severity="secondary" class="w-full" disabled />
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
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

const { t } = useI18n();
const { positions, departments } = useDetails();

const dialogVisible = computed({
  get: () => visible,
  set: (val) => emit('update:visible', val),
});

const formInputs = computed<Input[]>(() => [
  {
    field: 'email',
    label: t('labels.email'),
    component: 'InputText',
    props: { disabled: true },
  },
  {
    field: 'password',
    label: t('labels.password'),
    component: 'Password',
    props: {
      toggleMask: true,
      feedback: false,
    },
  },
  {
    field: 'firstName',
    label: t('labels.first_name'),
    component: 'InputText',
    props: {
      disabled: true,
    },
  },
  {
    field: 'lastName',
    label: t('labels.last_name'),
    component: 'InputText',
    props: { disabled: true },
  },
  {
    field: 'department',
    label: t('labels.department'),
    component: 'Select',
    props: {
      options: departments.value,
      optionLabel: 'name',
      optionValue: 'name',
    },
  },
  {
    field: 'position',
    label: t('labels.position'),
    component: 'Select',
    props: {
      disabled: false,
      options: positions.value,
      optionLabel: 'name',
      optionValue: 'name',
    },
  },
  {
    field: 'role',
    label: t('labels.role'),
    component: 'Select',
    props: { disabled: true },
  },
]);

const formInitialData = computed(() => ({
  firstName: user?.firstName || '',
  lastName: user?.lastName || '',
  email: user?.email || '',
  department: user?.departmentName || '',
  position: user?.positionName || '',
}));

const handleFormSubmit = (formData: Record<string, string>) => {
  emit('submit', formData);
  closeForm();
};

const closeForm = () => {
  emit('update:visible', false);
};
</script>
