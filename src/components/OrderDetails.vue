<template>
  <div class="order-details" v-if="order">
    <button class="edit-button" @click="editOrder(orderID)">✏️</button>
    <table>
      <tbody>
        <tr>
          <th>Order ID:</th>
          <td>{{ order.orderID }}</td>
        </tr>
        <tr>
          <th>Order Date:</th>
          <td>{{ order.orderDate }}</td>
        </tr>
        <tr>
          <th>Sold To:</th>
          <td>{{ order.soldTo.firstName }} {{ order.soldTo.lastName }}, Address: {{ formattedAddress(order.soldTo) }}</td>
        </tr>
        <tr>
          <th>Bill To:</th>
          <td>{{ order.billTo.firstName }} {{ order.billTo.lastName }}, Address: {{ formattedAddress(order.billTo) }}</td>
        </tr>
        <tr>
          <th>Ship To:</th>
          <td>{{ order.shipTo.firstName }} {{ order.shipTo.lastName }}, Address: {{ formattedAddress(order.shipTo) }}</td>
        </tr>
        <tr>
          <th>Order Value:</th>
          <td>{{ order.orderValue }}</td>
        </tr>
        <tr>
          <th>Tax Value:</th>
          <td>{{ order.taxValue }}</td>
        </tr>
        <tr>
          <th>Currency:</th>
          <td>{{ order.currencyCode }}</td>
        </tr>
        <tr v-for="(item, index) in order.items" :key="index">
          <th>Item {{ index + 1 }}:</th>
          <td>Product ID: {{ item.productID }}, Quantity: {{ item.quantity }}, Item Price: {{ item.itemPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useOrderStore } from '../stores/useOrderStore';
import { useRoute, useRouter } from 'vue-router';
import type { Order } from '../services/orderService';
import { useFormatters } from '../composables/useFormatters';

const { formattedAddress } = useFormatters();
const router = useRouter();
const route = useRoute();
const orderStore = useOrderStore();
const orderID = route.params.id as string;

const order = ref<Order>();

const loadOrder = async () => {
  try {
    order.value = await orderStore.getOrder(orderID);
  } catch (err) {
    console.error('Error loading order details:', err);
  }
};

const editOrder = (id: string) => {
  router.push(`/edit-order/${id}`);
};

onMounted(loadOrder);
</script>

<style lang="scss" scoped></style>
