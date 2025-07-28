import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { defineComponent } from 'vue';

import DynamicForm from '~/components/UI/DynamicForm.vue';
import type { Input } from '~/types/form.types';

const FormInputStub = defineComponent({
  props: ['modelValue', 'label', 'field'],
  emits: ['update:modelValue'],
  template: `
    <input 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      :aria-label="label" 
    />
  `,
});

const ButtonStub = defineComponent({
  template: '<button><slot /></button>',
});

const mockInputs: Input[] = [
  { field: 'email', label: 'Email', component: 'InputText' },
  { field: 'password', label: 'Password', component: 'Password' },
];

const mockInitialData: Record<string, string> = {
  email: 'test@example.com',
  password: '',
};

describe('DynamicForm', () => {
  const wrapper = mount(DynamicForm, {
    props: {
      inputs: mockInputs,
      initialData: mockInitialData,
    },
    global: {
      stubs: {
        FormInput: FormInputStub,
        Button: ButtonStub,
      },
    },
  });

  it('renders right number of inputs', () => {
    const renderedInputs = wrapper.findAllComponents(FormInputStub);
    expect(renderedInputs).toHaveLength(mockInputs.length);
  });

  it('submits form data on click', async () => {
    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('submit');
    const emittedEvent = wrapper.emitted('submit');

    if (emittedEvent) {
      expect(emittedEvent).toHaveLength(1);
      expect(emittedEvent[0][0]).toEqual(mockInitialData);
    }
  });

  it('updates form data', async () => {
    const emailInput = wrapper.find('input[aria-label="Email"]');
    await emailInput.setValue('test@example.com');

    await wrapper.find('button').trigger('click');

    const emittedEvent = wrapper.emitted('submit');
    if (emittedEvent)
      expect(emittedEvent[0][0]).toEqual({
        ...mockInitialData,
        email: 'test@example.com',
      });
  });
});
