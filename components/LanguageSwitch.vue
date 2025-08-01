<template>
  <nav>
    <NuxtLink
      v-for="lang in availableLocales"
      :key="lang.code"
      :to="switchLocalePath(lang.code)"
      class="lang-link"
    >
      {{ lang.name }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>
