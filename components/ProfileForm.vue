<template>
  <div class="flex flex-col items-center justify-center">
    <avatar-upload :avatar="''" />
    <h3 class="text-3xl mb-4">Dave</h3>
    <h2 class="text-neutral-400 mb-2">some@email.com</h2>
    <h2 class="mb-16">{{ t('profile.user.member_since') }} Jan 14 2024</h2>
    <dynamic-form
      :buttons="formButtons"
      :inputs="formInputs"
      :initial-data="init"
      :wrapper-class="'grid grid-cols-2 gap-x-10 gap-y-5 w-[55vw]'"
    />
  </div>
</template>

<script setup lang="ts">
import AvatarUpload from './UI/AvatarUpload.vue';
import DynamicForm from './UI/DynamicForm.vue';
import type { Input } from '~/types/form.types';

const { t } = useI18n();

const init = {
  firstName: 'Dave',
};

const formInputs = computed<Input[]>(() => [
  {
    field: 'firstName',
    label: 'first name',
    component: 'InputText',
  },
  {
    field: 'lastName',
    label: 'last name',
    component: 'InputText',
  },
  {
    field: 'dep',
    label: 'department',
    component: 'InputText',
  },
  {
    field: 'pos',
    label: 'position',
    component: 'InputText',
  },
]);

const formButtons = computed<Input[]>(() => [
  {
    field: 'updateButton',
    label: 'update',
    component: 'Button',
    props: {
      disabled: true,
    },
  },
]);
</script>
