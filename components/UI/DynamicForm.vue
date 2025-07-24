<template>
  <div class="w-[100%] gap-[20px] flex flex-col">
    <FloatLabel variant="on">
      <InputText id="on_label" />
      <label for="on_label">Email</label>
    </FloatLabel>

    <FloatLabel variant="on">
      <Password id="on_label" toggle-mask />
      <label for="on_label">Password</label>
    </FloatLabel>
  </div>

  <Button
    variant="primary"
    label="submit"
    class="w-[10rem] rounded-[50px] tracking-wider"
    @click="signup"
  />
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'; 
import FloatLabel from 'primevue/floatlabel';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { handleCreateUser } from '~/service/user';

const signup = () => {
  const authInput = { email: 'test@gmail.com', password: '12345678' };

  handleCreateUser(authInput);
};
</script>
