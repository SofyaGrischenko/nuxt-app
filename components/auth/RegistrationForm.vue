<template>
  <div
    class="w-[33vw] h-[50vw] m-auto flex flex-col items-center justify-center gap-[30px]"
  >
    <h1 class="text-3xl tracking-wider">Register now</h1>
    <h3>Welcome! Sign up to continue</h3>
    <dynamic-form />
    <p class="uppercase text-xs text-neutral-500">i have an account</p>
  </div>
</template>

<script setup lang="ts">
import DynamicForm from '@/components/UI/DynamicForm.vue';
</script>
