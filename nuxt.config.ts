import Aura_light from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@primevue/nuxt-module', '@nuxtjs/tailwindcss'],
  css: ['primeicons/primeicons.css', '@/assets/style/main.css'],

  primevue: {
    options: {
      theme: {
        preset: Aura_light,
      },
      ripple: true,
    },
  },
});
