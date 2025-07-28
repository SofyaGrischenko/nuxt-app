<template>
  <div class="flex flex-col min-h-screen">
    <header class="flex justify-center p-2">
      <nav class="flex space-x-4 uppercase">
        <NuxtLink to="/login" class="px-4 py-6"> log in </NuxtLink>
        <NuxtLink to="/signup" class="px-4 py-6"> sign up </NuxtLink>
      </nav>
    </header>

    <main
      class="flex-grow flex items-center justify-center p-8 overflow-y-auto"
    >
      <slot />
    </main>
  </div>
</template>
