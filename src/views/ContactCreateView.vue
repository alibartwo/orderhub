<template>
  <div class="contact-create">
    <h1>Create a New Contact</h1>
    <Card>
      <button @click="goBack">＜</button>
      <ContactCreateForm />
    </Card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Card from '../components/Card.vue';
import ContactCreateForm from '../components/ContactCreateForm.vue';

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style land="scss" scoped></style>
