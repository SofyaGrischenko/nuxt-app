<template>
  <aside class="w-60 h-full flex flex-col justify-between">
    <div class="space-y-2 text-neutral-300">
      <NuxtLink
        v-for="item in menuItems"
        :key="item.label"
        :to="item.path"
        class="flex items-center p-4 hover:bg-neutral-600 transition rounded-tr-full rounded-br-full"
        :class="{
          'bg-neutral-600 text-neutral-100': route.path === item.path,
        }"
      >
        <span :class="['pi', item.icon, 'mr-3 text-2xl']" />
        <span>{{ item.label }}</span>
      </NuxtLink>
    </div>
    <div class="p-3 mb-4">
      <NuxtLink
        :to="localePath(`/users/${currentUser?.id}/profile`)"
        class="flex items-center justify-start gap-3"
      >
        <img
          v-if="currentUser?.profile?.avatar"
          :src="currentUser.profile.avatar"
          :alt="currentUser.id"
          class="w-10 h-10 rounded-full object-cover"
        >
        <div
          v-else
          class="w-10 h-10 rounded-full bg-neutral-500 flex items-center justify-center text-lg text-neutral-700"
        >
          {{ currentUser?.profile?.firstName?.[0] }}
        </div>
        {{ currentUser?.profile?.firstName }}
        {{ currentUser?.profile?.lastName }}
      </NuxtLink>
      <i class="pi pi-sign-out text-2xl cursor-pointer mt-6" @click="logout" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const { logout } = useAuth();
const localePath = useLocalePath();
const { t } = useI18n();
const { currentUser, fetchCurrentUser } = useCurrentUser();

const menuItems = computed(() => [
  {
    label: t('sidebar.employees'),
    path: localePath('/users'),
    icon: 'pi-users',
  },
  {
    label: t('sidebar.skills'),
    path: localePath('/skills'),
    icon: 'pi-chart-line',
  },
  {
    label: t('sidebar.languages'),
    path: localePath('/languages'),
    icon: 'pi-language',
  },
]);

onMounted(async () => {
  await fetchCurrentUser();
});
</script>
