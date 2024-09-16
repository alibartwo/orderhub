<template>
  <div class="contact-create">
    <h1>Create a New Contact</h1>
    <Card
      ><GoBack />
      <ContactCreateForm />
    </Card>
  </div>
</template>

<script setup>
import Card from '../components/Card.vue';
import ContactCreateForm from '../components/ContactCreateForm.vue';
import GoBack from '../components/GoBack.vue';
</script>

<style land="scss" scoped></style>
