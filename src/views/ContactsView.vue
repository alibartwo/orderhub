<template>
  <div class="contacts-container">
    <h1>Contacts</h1>
    <Card><ContactButtons/></Card>
    <Card><ContactList /></Card>
  </div>
</template>

<script setup>
import Card from '../components/Card.vue';
import ContactList from '../components/ContactList.vue';
import ContactButtons from '../components/ContactButtons.vue';
</script>

<style lang="scss" scoped>
.contacts-container {
  padding: 20px;
}
</style>
