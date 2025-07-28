<template>
  <div class="flex flex-col h-screen">
    <div class="h-10">breadcrumb</div>
    <div  class="flex flex-1 overflow-hidden">
      <app-sidebar />
      <main class="w-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '~/components/AppSidebar.vue';
</script>
