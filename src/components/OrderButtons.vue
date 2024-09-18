<template>
  <div class="buttons">
    <button @click="loadSampleOrders">Load Sample Orders</button>
    <button @click="showCreateForm">Create an Order</button>
    <button @click="confirmDeleteAllContacts">Delete All Orders</button>
    <button @click="toggleSearch">Search an Order</button>

    <div v-if="showSearchInput" class="search-form">
      <input v-model="searchTerm" type="text" placeholder="Enter order name..." />
      <button @click="searchOrder">Search</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import router from '../routers';
import { useOrderStore } from '../stores/useOrderStore';

const orderStore = useOrderStore();
const { removeAllOrders, loadSampleData } = orderStore;

// load sample orders after confirmation
const loadSampleOrders = (): void => {
  const confirmation = confirm(
    'Are you sure you want to load sample orders? This action will be delete existing orders and create the sample ones'
  );
  if (confirmation) {
    loadSampleData();
  }
};

const showCreateForm = (): void => {
  router.push('/create-order');
};

const confirmDeleteAllContacts = (): void => {
  const confirmation = confirm('Are you sure you want to delete all orders? This action cannot be undone.');
  if (confirmation) {
    removeAllOrders();
  }
};

// this section deals with search functionality
const searchTerm = ref<string>('');
const showSearchInput = ref<boolean>(false);

const toggleSearch = () => {
  showSearchInput.value = !showSearchInput.value;
};

const searchOrder = (): void => {
  if (searchTerm.value) {
    // orderStore.searchOrders(searchTerm.value); // sample function
  } else {
    alert('Please enter a search term.');
  }
};
</script>
