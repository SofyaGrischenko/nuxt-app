<template>
  <div class="flex flex-col h-screen">
    <div class="h-10 w-full flex justify-end py-3 px-5">
      <language-switch />
    </div>
    <div class="flex flex-1 overflow-hidden">
      <app-sidebar />
      <main class="w-full overflow-y-scroll no-scrollbar">
        <slot />
        <DynamicDialog />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import DynamicDialog from 'primevue/dynamicdialog';
import AppSidebar from '~/components/AppSidebar.vue';
</script>
