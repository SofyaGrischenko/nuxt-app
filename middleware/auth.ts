export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, refreshToken } = useAuth();
  const localePath = useLocalePath();

  const isPublicPage = to.meta.auth === 'public';

  if (isLoggedIn.value && isPublicPage) {
    return navigateTo(localePath('/users'));
  }

  if (!isLoggedIn.value && !refreshToken.value && !isPublicPage) {
    return navigateTo(localePath('/login'));
  }
});
