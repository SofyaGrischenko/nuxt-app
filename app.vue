<template>
  <NuxtLayout>
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-100"
    >
      <div class="text-white text-xl flex gap-1">
        Loading
        <span class="dot">.</span>
        <span class="dot">.</span>
        <span class="dot">.</span>
      </div>
    </div>
    <NuxtPage />
    <Toast />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { isLoading } = useGlobalLoading();
</script>

<style>
.dot {
  opacity: 0;
  animation: blink 1.5s infinite;
}
.dot:nth-child(2) {
  animation-delay: 0.3s;
}
.dot:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes blink {
  0%,
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
