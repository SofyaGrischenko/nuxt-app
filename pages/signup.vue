<template>
  <AuthForm
    :title="t('auth.signup_page.title')"
    :caption="t('auth.signup_page.caption')"
    :inputs
    :submit-handler="signup"
    :link-to="localePath('/login')"
    :link-text="t('auth.signup_page.login_link')"
    :submit-button="t('auth.signup_page.submit_button')"
    class="h-full"
  />
</template>

<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue';

const { signup } = useAuth();
const localePath = useLocalePath();
const { t } = useI18n();

definePageMeta({
  middleware: 'auth',
  layout: 'auth',
  auth: 'public',
});

const inputs = ref([
  {
    label: t('labels.email'),
    field: 'email',
    component: 'InputText',
  },
  {
    label: t('labels.password'),
    field: 'password',
    component: 'Password',
    props: {
      toggleMask: true,
      feedback: false,
    },
  },
]);

onMounted(() => (isLoading.value = false));
</script>
