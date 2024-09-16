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

<script setup>
import { useOrderStore } from '../stores/useOrderStore';
import { ref } from 'vue';
import router from '../routers';
const orderStore = useOrderStore();
const { removeAllOrders, loadSampleData, orders } = orderStore;

const loadSampleOrders = () => {
  const confirmation = confirm(
    'Are you sure you want to load sample orders? This action will be delete existing orders and create the sample ones'
  );
  if (confirmation) {
    loadSampleData();
  }
};
const showCreateForm = () => {
  router.push('/create-order');
};

const confirmDeleteAllContacts = () => {
  const confirmation = confirm('Are you sure you want to delete all orders? This action cannot be undone.');
  if (confirmation) {
    removeAllOrders();
  }
};

const searchTerm = ref('');
const showSearchInput = ref(false);

const toggleSearch = () => {
  showSearchInput.value = !showSearchInput.value;
};

const searchOrder = () => {
  if (searchTerm.value) {
    // orderStore.searchOrders(searchTerm.value);
  } else {
    alert('Please enter a search term.');
  }
};
</script>