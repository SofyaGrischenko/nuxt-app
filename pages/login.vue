<template>
  <AuthForm
    :title="t('auth.login_page.title')"
    :caption="t('auth.login_page.caption')"
    :inputs
    :submit-handler="login"
    :link-to="localePath('/signup')"
    :link-text="t('auth.login_page.forgot_password_link')"
    :submit-button="t('auth.login_page.submit_button')"
    class="h-full"
  />
</template>

<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue';

const { login } = useAuth();
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
</script>
