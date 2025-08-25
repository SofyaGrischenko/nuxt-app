// import Aura_light from '@primeuix/themes/aura';
import mainTheme from './presets/mainTheme';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
  ],

  primevue: {
    // autoImport: false,
    components: {
      include: [
        'Select',
        'Menu',
        'Password',
        'Button',
        'Toast',
        'DataTable',
        'Column',
        'FloatLabel',
        'Avatar',
      ],
    },
    options: {
      ripple: true,
      theme: {
        preset: mainTheme,
      },
    },
  },

  css: ['primeicons/primeicons.css', '@/assets/style/main.css'],

  tailwindcss: {
    configPath: 'tailwind.config.ts',
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
    },
  },
});
