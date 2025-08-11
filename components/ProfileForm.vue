<template>
  <div v-if="init" class="flex flex-col items-center justify-center">
    <avatar-upload v-model="newAvatar" :avatar="init.avatarUrl" />

    <h3 class="text-3xl mb-4">{{ init?.first_name }} {{ init?.last_name }}</h3>
    <h2 class="text-neutral-400 mb-2">{{ init?.email }}</h2>
    <h2 class="mb-16">
      {{ t('profile.user.member_since') }} {{ formattedDate }}
    </h2>

    <div class="flex flex-col">
      <dynamic-form
        v-model="init"
        :inputs="formInputs"
        :wrapper-class="'grid grid-cols-2 gap-x-10 gap-y-5 w-[55vw]'"
      />

      <div class="flex w-full justify-end mt-8">
        <Button
          type="submit"
          variant="primary"
          :label="t('updateButton')"
          class="w-[48%] tracking-wider"
          @click="handleUpdateProfile"
        />
      </div>
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
const { currentUser, fetchCurrentUser, updateUser } = useCurrentUser();
const { positions, departments, getPositions, getDepartments } = useDetails();

const init = ref<FlatUser>();
const originalUser = ref<FlatUser>();
const newAvatar = ref<File | null>(null);

const handleUpdateProfile = async () => {
  if (!originalUser.value || !init.value) {
    return;
  }

  await updateUser(originalUser.value, init.value, newAvatar.value);
  originalUser.value = JSON.parse(JSON.stringify(init.value));
};

const formattedDate = computed(() => {
  if (!currentUser.value?.created_at) return '';
  const timestamp = Number(currentUser.value?.created_at);
  return new Date(timestamp).toLocaleDateString();
});

const formInputs = computed<Input[]>(() => [
  {
    field: 'first_name',
    label: t('labels.first_name'),
    component: 'InputText',
  },
  {
    field: 'last_name',
    label: t('labels.last_name'),
    component: 'InputText',
  },
  {
    field: 'department_name',
    label: t('labels.department'),
    component: 'Select',
    props: {
      options: departments.value,
      optionLabel: 'name',
      optionValue: 'name',
    },
  },
  {
    field: 'position_name',
    label: t('labels.position'),
    component: 'Select',
    props: {
      options: positions.value,
      optionLabel: 'name',
      optionValue: 'name',
    },
  },
]);

onMounted(async () => {
  await Promise.all([fetchCurrentUser(), getPositions(), getDepartments()]);

  if (currentUser.value) {
    const { profile, ...rest } = currentUser.value;
    const flatUser = { ...profile, ...rest };

    init.value = JSON.parse(JSON.stringify(flatUser));
    originalUser.value = JSON.parse(JSON.stringify(flatUser));
  }
});
</script>
