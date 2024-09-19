<template>
  <div class="list">
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
    <!-- order list shown only with not loading and no errors -->
    <table v-if="!loading && !error">
      <thead>
        <tr>
          <th>ID</th>
          <th>Order Date</th>
          <th>Sold To</th>
          <th>Order Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- loop through each order and display them in a row -->
        <tr v-for="order in orders" :key="order.orderID">
          <td>{{ order.orderID }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ `${order.soldTo.firstName} ${order.soldTo.lastName}` }}</td>
          <td>{{ order.orderValue }}</td>
          <td>
            <button @click="orderDetail(order.orderID)" class="action-button">🔍</button>
            <button @click="editOrder(order.orderID)" class="action-button">✏️</button>
            <button @click="deleteOrder(order.orderID)" class="action-button">❌</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../stores/useOrderStore';

const router = useRouter();
const orderStore = useOrderStore();

// computed properties for reactive state management
const orders = computed(() => orderStore.orders);
const loading = computed(() => orderStore.loading);
const error = computed(() => orderStore.error);

// function to navigate to edit order page
const editOrder = (id: string) => {
  router.push(`/edit-order/${id}`);
};

// function to delete an order after confirmation
const deleteOrder = (id: string) => {
  const confirmation = confirm(`Are you sure you want to delete the contact: ${id}? This action cannot be undone.`);
  if (confirmation) {
    orderStore.removeOrder(id);
  }
};

// function to navigate to order detail page
const orderDetail = (id: string) => {
  router.push(`order-details/${id}`);
};

// load the orders when the component is mounted
onMounted(() => {
  orderStore.loadOrders();
});

</script>
<style lang="scss" scoped></style>
