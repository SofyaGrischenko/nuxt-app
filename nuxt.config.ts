import graphql from 'vite-plugin-graphql';

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    // '@nuxt/test-utils/module',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/apollo',
  ],
  css: ['@/assets/style/app-theme.css'],
  plugins: ['~/plugins/apollo-client'],
  vite: {
    plugins: [graphql],
  },
  primevue: {
    options: {
      theme: {
        name: 'aura',
      },
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
