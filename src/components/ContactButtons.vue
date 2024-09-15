<template>
  <div class="buttons">
    <button @click="loadSampleContacts">Load Sample Contacts</button>
    <button @click="showCreateForm">Add New Contact</button>
    <button @click="confirmDeleteAllContacts">Delete All Contacts</button>
    <button @click="toggleSearch">Search a Contact</button>

    <div v-if="showSearchInput" class="search-form">
      <input v-model="searchTerm" type="text" placeholder="Enter contact name..." />
      <button @click="searchContact">Search</button>
    </div>
  </div>
</template>

<script setup>
import { useContactStore } from '../stores/useContactStore';
import { sampleContacts } from '../data/sampleContacts';
import { ref } from 'vue';
import router from '../routers';
const contactStore = useContactStore();
const { removeAllContacts, loadSampleData, contacts } = contactStore;

const loadSampleContacts = () => {
  const confirmation = confirm(
    'Are you sure you want to load sample contacts? This action will be delete existing contacts and create the sample ones'
  );
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

const searchTerm = ref('');
const showSearchInput = ref(false);

const toggleSearch = () => {
  showSearchInput.value = !showSearchInput.value;
};

const searchContact = () => {
  if (searchTerm.value) {
    // contactStore.searchContacts(searchTerm.value);
  } else {
    alert('Please enter a search term.');
  }
};
</script>

<style lang="scss" scoped></style>
