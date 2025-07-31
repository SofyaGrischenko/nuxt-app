<template>
  <AuthForm
    :title="$t('auth.signup_page.title')"
    :caption="$t('auth.signup_page.caption')"
    :inputs
    :submit-handler="signup"
    link-to="/login"
    :link-text="$t('auth.signup_page.login_link')"
    :submit-button="$t('auth.signup_page.submit_button')"
    class="h-full"
  />
</template>

<script setup lang="ts">
import AuthForm from '~/components/AuthForm.vue';

const { signup } = useAuth();

definePageMeta({
  middleware: 'auth',
  layout: 'auth',
});

const inputs = ref([
  {
    label: $t('auth.input_label.email'),
    field: 'email',
    component: 'InputText',
  },
  {
    label: $t('auth.input_label.password'),
    field: 'password',
    component: 'Password',
    props: {
      toggleMask: true,
      feedback: false,
    },
  },
]);
</script>
