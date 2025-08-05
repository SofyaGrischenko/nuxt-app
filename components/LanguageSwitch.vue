<template>
  <div>
    <select
      v-model="locale"
      class="bg-transparent outline-none"
      @change="onLocaleChange"
    >
      <option
        v-for="lang in locales"
        :key="lang.code"
        :value="lang.code"
        class="bg-neutral-800 border-none"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, loadLocaleMessages } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const onLocaleChange = async () => {
  const newLocale = locale.value;

  await loadLocaleMessages(newLocale);

  const path = switchLocalePath(newLocale);

  navigateTo(path);
};
</script>
