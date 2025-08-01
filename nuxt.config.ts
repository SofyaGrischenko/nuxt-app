import Aura_light from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
  ],
  css: ['primeicons/primeicons.css', '@/assets/style/main.css'],

  primevue: {
    options: {
      theme: {
        preset: Aura_light,
      },
      ripple: true,
    },
  },

  i18n: {
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'ru', file: 'ru.json', name: 'Русский' },
    ],

    defaultLocale: 'en',
    langDir: 'locales/',
    strategy: 'prefix_except_default',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en',
      // cookieCrossOrigin: true,
    },
  },
});
