export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('access_token');
  const publicPages = ['/login', '/signup'];

  if (!token.value && !publicPages.includes(to.path)) {
    return navigateTo('/login');
  }

  if (token.value && publicPages.includes(to.path)) {
    return navigateTo('/users');
  }
});
