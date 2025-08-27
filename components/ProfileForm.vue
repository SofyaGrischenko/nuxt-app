<template>
  <div v-if="userToDisplay" class="flex flex-col items-center justify-center">
    <AvatarUpload
      v-model="newAvatar"
      :name="userToDisplay.firstName ?? ''"
      :initial-preview-url="userToDisplay.avatar"
      :is-editable
    />

    <h3 class="text-3xl mb-4">
      {{ userToDisplay?.firstName }} {{ userToDisplay?.lastName }}
    </h3>
    <h2 class="text-neutral-400 mb-2">{{ userToDisplay?.email }}</h2>
    <h2 class="mb-16">
      {{ t('profile.user.member_since') }} {{ formattedDate }}
    </h2>

    <div class="flex flex-col">
      <DynamicForm
        v-if="formData"
        v-model="formData"
        :inputs="formInputs"
        :wrapper-class="'grid grid-cols-2 gap-x-10 gap-y-5 w-[55vw]'"
      />

      <div class="flex w-full justify-end mt-8">
        <Button
          v-if="isEditable"
          :label="t('updateButton')"
          type="submit"
          variant="primary"
          class="w-[48%] tracking-wider"
          @click="handleUpdateProfile"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarUpload from './UI/AvatarUpload.vue';
import DynamicForm from './UI/DynamicForm.vue';
import type { Input } from '~/types/form.types';
import type { FlatUser, User } from '~/types/user.types';

const { t } = useI18n();
const { currentUser, fetchCurrentUser } = useCurrentUser();
const { updateUser, selectedUser, fetchOneUser } = useUsers();
const { positions, departments, getPositions, getDepartments } = useDetails();

const route = useRoute();
const { isAdmin } = useCurrentUser();

const formData = ref<FlatUser>();
const originalUser = ref<FlatUser | null>(null);
const newAvatar = ref<File | null>(null);

const profileUserId = computed(() => route.params.id as string);
const loggedInUserId = computed(() => currentUser.value?.id);
const isEditable = computed(() => {
  return profileUserId.value === loggedInUserId.value || isAdmin.value;
});

const userToDisplay = computed(() => {
  if (!selectedUser.value) return null;
  const { profile, ...rest } = selectedUser.value;
  return { ...profile, ...rest };
});

const flattenUser = (user: User): FlatUser => {
  const { profile, ...rest } = user;
  return { ...profile, ...rest };
};

const handleUpdateProfile = async () => {
  if (!originalUser.value || !formData.value) return;

  await updateUser(originalUser.value, formData.value, newAvatar.value);
};

const formattedDate = computed(() => {
  const timestamp = Number(userToDisplay.value?.createdAt);
  return new Date(timestamp).toLocaleDateString();
});

const formInputs = computed<Input[]>(() => {
  const inputs: Input[] = [
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
      field: 'departmentName',
      label: t('labels.department'),
      component: 'Select',
      props: {
        options: departments.value,
        optionLabel: 'name',
        optionValue: 'name',
      },
    },
    {
      field: 'positionName',
      label: t('labels.position'),
      component: 'Select',
      props: {
        options: positions.value,
        optionLabel: 'name',
        optionValue: 'name',
      },
    },
  ];

  return inputs.map((input) => ({
    ...input,
    props: {
      ...input?.props,
      disabled: !isEditable.value,
    },
  }));
});

onMounted(async () => {
  await Promise.all([
    fetchOneUser(profileUserId.value),
    fetchCurrentUser(),
    getPositions(),
    getDepartments(),
  ]);
});

watch(
  selectedUser,
  (newUser) => {
    if (newUser) {
      const flat = flattenUser(newUser);
      formData.value = { ...flat };
      originalUser.value = { ...flat };
    }
  },
  { immediate: true }
);
</script>
