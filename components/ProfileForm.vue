<template>
  <div v-if="init" class="flex flex-col items-center justify-center">
    <avatar-upload :avatar="''" />
    <h3 class="text-3xl mb-4">{{ init?.firstName }} {{ init?.lastName }}</h3>
    <h2 class="text-neutral-400 mb-2">{{ init?.email }}</h2>
    <h2 class="mb-16">
      {{ t('profile.user.member_since') }} {{ formattedDate }}
    </h2>
    <div>
      <dynamic-form
        v-model="init"
        :inputs="formInputs"
        :wrapper-class="'grid grid-cols-2 gap-x-10 gap-y-5 w-[55vw]'"
      />
      <Button
        type="submit"
        variant="primary"
        :label="t('updateButton')"
        class="w-[10rem] tracking-wider content-end"
        @click="console.log(init)"
      />
    </div>
  </div>
  <div v-else class="flex justify-center text-xl mt-[20vh]">
    {{ t('loading') }}
  </div>
</template>

<script setup lang="ts">
import AvatarUpload from './UI/AvatarUpload.vue';
import DynamicForm from './UI/DynamicForm.vue';
import type { Input } from '~/types/form.types';
import type { FlatUser } from '~/types/user.types';

const { t } = useI18n();
const { positions, departments, getDepartments, getPositions } = useDetails();
const { currentUser, fetchCurrentUser } = useCurrentUser();

const init = ref<FlatUser | null>(null);

const formattedDate = computed(() => {
  if (!currentUser.value?.created_at) return '';
  const timestamp = Number(currentUser.value?.created_at);
  return new Date(timestamp).toLocaleDateString();
});

const formInputs = computed<Input[]>(() => [
  {
    field: 'firstName',
    label: t('labels.first_name'),
    component: 'InputText',
  },
  {
    field: 'lastName',
    label: t('labels.last_name'),
    component: 'InputText',
  },
  {
    field: 'department',
    label: t('labels.department'),
    component: 'Select',
    props: {
      options: departments.value,
    },
  },
  {
    field: 'position',
    label: t('labels.position'),
    component: 'Select',
    props: {
      options: positions.value,
    },
  },
]);

onMounted(async () => {
  await Promise.all([fetchCurrentUser(), getPositions(), getDepartments()]);

  if (currentUser.value) {
    const { profile, ...rest } = currentUser.value;
    init.value = { ...profile, ...rest };
  }
});
</script>
