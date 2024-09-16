<template>
    <div class="contact-edit">
      <h1>Edit the Contact</h1>
      <Card>
        <GoBack />
        <ContactEditForm />
      </Card>
    </div>
  </template>
  
  <script setup>
  import Card from '../components/Card.vue';
  import ContactEditForm from '../components/ContactEditForm.vue';
  import GoBack from '../components/GoBack.vue'
  </script>
  
  <style land="scss" scoped></style>
  