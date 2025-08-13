import { useVuelidate } from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';
import type { AuthInput } from '~/types/user.types';

export const useAuthValidation = (data: AuthInput) => {
  const rules = computed(() => ({
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('not email', email),
    },
    password: {
      required: helpers.withMessage('Password is required', required),
    },
  }));

  const v = useVuelidate(rules, data);

  return {
    v,
  };
};
