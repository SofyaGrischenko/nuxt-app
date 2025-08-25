/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './presets/mainTheme.ts',
  ],
  // theme: {
  //   extend: {
  // посмотреть можно ли через здесь переписать использование пресета
  //   }
  // },
  plugins: [],
  safelist: [
    {
      pattern: /^p-/,
    },
  ],
};
