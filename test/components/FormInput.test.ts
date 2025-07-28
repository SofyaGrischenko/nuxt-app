import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import PrimeVue from 'primevue/config';

import FormInput from '@/components/UI/FormInput.vue';

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const FloatLabel = {
  template: '<div><slot /></div>',
};

const mountOptions = {
  global: {
    plugins: [PrimeVue],
    stubs: {
      FloatLabel,
    },

    components: {
      InputText,
      Password,
    },
  },
};

describe('FormInput', () => {
  it('renders text input and correct label', async () => {
    const wrapper = mount(FormInput, {
      ...mountOptions,
      props: {
        label: 'Email',
        field: 'email',
        component: 'InputText',
      },
    });

    await flushPromises();

    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Email');
    expect(label.attributes('for')).toBe('email');

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes('id')).toBe('email');
  });

  it('renders password input', async () => {
    const wrapper = mount(FormInput, {
      ...mountOptions,
      props: {
        label: 'Password',
        field: 'password',
        component: 'Password',
      },
    });

    await flushPromises();

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(wrapper.find('.p-password').exists()).toBe(true);
  });

  it('updates modelValue when data is entered', async () => {
    const wrapper = mount(FormInput, {
      ...mountOptions,
      props: {
        label: 'Email',
        field: 'email',
        component: 'InputText',
        modelValue: '',
      },
    });

    await flushPromises();
    await wrapper.find('input').setValue('test-email');

    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toHaveLength(1);

    if (emitted) expect(emitted[0]).toEqual(['test-email']);
  });

  it('passes additional attributes ($attrs) to the child component', async () => {
    const wrapper = mount(FormInput, {
      ...mountOptions,
      props: {
        label: 'Email',
        field: 'email',
        component: 'InputText',
      },
      attrs: {
        placeholder: 'enter email',
        disabled: true,
      },
    });

    await flushPromises();

    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('enter email');
    expect(input.element.disabled).toBe(true);
  });
});
