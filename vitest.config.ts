import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    include: ['test/**/*.test.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      all: true,

      include: [
        'components/**',
        'composables/**',
        'layouts/**',
        'pages/**',
        'plugins/**',
        'server/**',
        'store/**',
        'utils/**',
        'app.vue',
      ],

      exclude: [
        'coverage/**',
        'dist/**',
        '.nuxt/**',
        '**/*.d.ts',
        '**/node_modules/**',
      ],
    },
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, '.'),
      '@': path.resolve(__dirname, '.'),
    },
  },
});
