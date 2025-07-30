export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, refreshToken, refresh } = useAuth();
  const publicPages = ['/login', '/signup'];
  const isPublicPage = publicPages.includes(to.path);

  if (!isLoggedIn.value && refreshToken.value) {
    try {
      await refresh();
    } catch (e) {
      console.warn(e);
    }
  }

  

  if (isLoggedIn.value && isPublicPage) {
    return navigateTo('/users');
  }

  if (!isLoggedIn.value && !isPublicPage) {
    return navigateTo('/login');
  }
});
