export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath();

  if (to.path === localePath('/')) {
    return navigateTo(localePath('/users'));
  }
});
