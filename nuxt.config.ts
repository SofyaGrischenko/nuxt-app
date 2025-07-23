import graphql from 'vite-plugin-graphql';
import Aura_light from '@primeuix/themes/aura';
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
  ],
  css: ['@/assets/style/main.css'],
  plugins: ['~/plugins/apollo-client'],
  vite: {
    plugins: [graphql],
  },
  primevue: {
    options: {
      theme: {
        preset: Aura_light,
      },
      ripple: true,
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://cv-project-js.inno.ws/api/graphql', //-graphql
      },
    },
  },
});
