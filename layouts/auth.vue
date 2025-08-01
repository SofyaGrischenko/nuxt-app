<template>
  <div class="flex flex-col min-h-screen">
    <header class="relative flex justify-center items-center p-2">
      <nav class="flex space-x-4 uppercase">
        <NuxtLink :to="localePath('/login')" class="px-4 py-6">{{
          $t('auth.navigation.log_in')
        }}</NuxtLink>
        <NuxtLink :to="localePath('/signup')" class="px-4 py-6">{{
          $t('auth.navigation.sign_up')
        }}</NuxtLink>
      </nav>

      <div class="absolute right-6">
        <language-switch />
      </div>
    </header>

    <main
      class="flex-grow flex items-center justify-center p-8 overflow-y-auto"
    >
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitch from '~/components/LanguageSwitch.vue';

const localePath = useLocalePath();
</script>
