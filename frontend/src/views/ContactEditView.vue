<template>
    <div class="contact-edit">
      <h1>Edit the Contact</h1>
      <Card>
        <GoBack />
        <ContactForm />
      </Card>
    </div>
  </template>
  
  <script setup>
  import Card from '../components/Card.vue';
  import ContactForm from '../components/ContactForm.vue';
  import GoBack from '../components/GoBack.vue'
  </script>
  
  <style land="scss" scoped></style>
  