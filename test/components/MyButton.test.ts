import { mount } from '@vue/test-utils';
import MyButton from '../../components/UI/MyButton.vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import { describe, it, expect } from 'vitest';

describe('MyButton', () => {
  it('renders PrimeVue Button', () => {
    const wrapper = mount(MyButton, {
      global: {
        plugins: [PrimeVue],
        components: { Button },
      },
    });
    expect(wrapper.findComponent(Button).exists()).toBe(true);
    expect(wrapper.text()).toContain('Primary');
  });
});