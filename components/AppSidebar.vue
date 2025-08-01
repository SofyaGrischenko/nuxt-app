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
    <div class="p-6">
      <language-switch />
      <i class="pi pi-sign-out text-2xl cursor-pointer" @click="logout" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const { logout } = useAuth();
const localePath = useLocalePath();
const { t } = useI18n();

const menuItems = computed(() => [
  {
    label: t('sidebar.employees'),
    path: localePath('/users'),
    icon: 'pi-users',
  },
  {
    label: t('sidebar.skills'),
    path: localePath('/'),
    icon: 'pi-chart-line',
  },
  {
    label: t('sidebar.languages'),
    path: localePath('/'),
    icon: 'pi-language',
  },
  {
    label: t('sidebar.cvs'),
    path: localePath('/cvs'),
    icon: 'pi-file',
  },
]);
</script>
