<template>
  <div>
    <Select
      v-model="locale"
      class="outline-none"
      :options="locales"
      option-label="name"
      option-value="code"
      @change="onLocaleChange"
    />
  </div>
</template>

<script setup lang="ts">
import Select from 'primevue/select';
const { locale, locales, loadLocaleMessages } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const onLocaleChange = async () => {
  const newLocale = locale.value;

  await loadLocaleMessages(newLocale);

  const path = switchLocalePath(newLocale);

  navigateTo(path);
};
</script>
