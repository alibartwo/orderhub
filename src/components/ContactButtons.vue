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

<script lang="ts" setup>

import { useContactStore } from '../stores/useContactStore';
import { ref } from 'vue';
import router from '../routers';

// store usage
const contactStore = useContactStore();
const { removeAllContacts, loadSampleData } = contactStore;

const loadSampleContacts = (): void => {
  const confirmation = confirm(
    'Are you sure you want to load sample contacts? This action will be delete existing contacts and create the sample ones'
  );
  if (confirmation) {
    loadSampleData();
  }
};
const showCreateForm = (): void => {
  router.push('/create-contact');
};

const confirmDeleteAllContacts = (): void => {
  const confirmation = confirm('Are you sure you want to delete all contacts? This action cannot be undone.');
  if (confirmation) {
    removeAllContacts();
  }
};

// this section deals with search functionality
const searchTerm = ref<string>('');
const showSearchInput = ref<boolean>(false);

const toggleSearch = (): void => {
  showSearchInput.value = !showSearchInput.value;
};

const searchContact = (): void => {
  if (searchTerm.value) {
    // contactStore.searchContacts(searchTerm.value); // sample function for searching contacts
  } else {
    alert('Please enter a search term.');
  }
};
</script>

<style lang="scss"></style>
