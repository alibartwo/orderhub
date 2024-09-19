<template>
  <div class="contact-create">
    <h1>Create a New Contact</h1>
    <Card>
      <GoBack />
      <ContactForm />
    </Card>
  </div>
</template>

<script setup>
import Card from '../components/Card.vue';
import GoBack from '../components/GoBack.vue';
import ContactForm from '../components/ContactForm.vue';
</script>

<style land="scss" scoped></style>
