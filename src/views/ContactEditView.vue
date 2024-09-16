<template>
    <div class="contact-edit">
      <h1>Edit the Contact</h1>
      <Card>
        <button @click="goBack">＜</button>
        <ContactEditForm />
      </Card>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import Card from '../components/Card.vue';
  import ContactEditForm from '../components/ContactEditForm.vue';
  
  const router = useRouter();
  
  const goBack = () => {
    router.back();
  };
  </script>
  
  <style land="scss" scoped></style>
  