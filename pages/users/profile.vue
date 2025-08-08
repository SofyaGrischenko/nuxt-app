<template>
  <div>
    <profile-form />
  </div>
</template>

<script setup lang="ts">
import ProfileForm from '~/components/ProfileForm.vue';
definePageMeta({
  middleware: 'auth',
});
</script>
