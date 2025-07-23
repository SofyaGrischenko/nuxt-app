import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    include: ['**/*.test.{js,ts}'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['**/node_modules/**', '**/.nuxt/**'],
    },
  },
});
