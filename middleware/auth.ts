export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, refreshToken } = useAuth();
  const publicPages = ['/login', '/signup'];
  const isPublicPage = publicPages.includes(to.path);

  if (isLoggedIn.value && isPublicPage) {
    return navigateTo('/users');
  }

  if (!isLoggedIn.value && !refreshToken.value && !isPublicPage) {
    return navigateTo('/login');
  }
});
