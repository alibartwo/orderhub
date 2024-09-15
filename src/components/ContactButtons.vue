<template>
  <div class="buttons">
    <button @click="loadSampleContacts">Load Sample Contacts</button>
    <button @click="showCreateForm">Add New Contact</button>
    <button @click="confirmDeleteAllContacts">Delete All Contacts</button>
    <button @click="showSearchForm">Search a Contact</button>
  </div>
</template>

<script setup>
import { useContactStore } from '../stores/useContactStore';
import { sampleContacts } from '../data/sampleContacts';
import router from '../routers';
const contactStore = useContactStore();
const { removeAllContacts, loadSampleData, contacts } = contactStore;

const loadSampleContacts = () => {
  const confirmation = confirm('Are you sure you want to load sample contacts? This action will be delete existing contacts and create the sample ones');
  if (confirmation) {
    loadSampleData();
  }
};
const showCreateForm = () => {
  router.push('/create-contact');
};

const confirmDeleteAllContacts = () => {
  const confirmation = confirm('Are you sure you want to delete all contacts? This action cannot be undone.');
  if (confirmation) {
    removeAllContacts();
  }
};

const showSearchForm = () => {};
</script>

<style lang="scss" scoped></style>
