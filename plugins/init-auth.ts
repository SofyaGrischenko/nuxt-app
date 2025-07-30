import { useCookie } from '#app';
export default defineNuxtPlugin(async () => {
  const { refresh } = useAuth();

  const accessToken = useCookie('access_token');
  const refreshToken = useCookie('refresh_token');

  if (!accessToken && refreshToken) {
    await refresh();
  }
});
