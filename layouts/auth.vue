<template>
  <div class="auth-layout">
    <header class="auth-header">
      <nav class="header_nav">
        <NuxtLink to="/login">log in</NuxtLink>
        <NuxtLink to="/signup">sign up</NuxtLink>
      </nav>
    </header>

    <main class="auth-content">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.auth-header {
  flex-shrink: 0;
  padding: 1rem 2rem;
  background-color: transparent;

  display: flex;
  justify-content: center;
}

.auth-content {
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
}

.header_nav a {
  text-transform: uppercase;
  padding: 1.5rem 1rem;
}
</style>
