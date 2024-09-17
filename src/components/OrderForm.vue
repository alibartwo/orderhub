<template>
  <div class="form">
    <form @submit.prevent="handleSubmit">
      <div class="form-field">
        <label for="orderDate">Order Date</label>
        <input v-model="order.orderDate" type="text" id="orderDate" />
      </div>

      <div class="form-field">
        <label for="soldTo">Sold To</label>
        <select v-model="order.soldTo" id="soldto">
          <option v-for="contact in contacts" :key="contact.id" :value="contact">
            {{ contact.firstName }} {{ contact.lastName }}
          </option>
        </select>
      </div>

      <div class="form-field">
        <label for="billTo">Bill To</label>
        <select v-model="order.billTo" id="billTo">
          <option v-for="contact in contacts" :key="contact.id" :value="contact">
            {{ contact.firstName }} {{ contact.lastName }}
          </option>
        </select>
      </div>

      <div class="form-field">
        <label for="shipTo">Ship To</label>
        <select v-model="order.shipTo" id="shipTo">
          <option v-for="contact in contacts" :key="contact.id" :value="contact">
            {{ contact.firstName }} {{ contact.lastName }}
          </option>
        </select>
      </div>

      <div class="form-field">
        <label for="orderValue">Order Value</label>
        <input v-model="order.orderValue" type="text" id="orderValue" />
      </div>

      <div class="form-field">
        <label for="taxValue">Tax Value</label>
        <input v-model="order.taxValue" type="text" id="taxValue" />
      </div>

      <div class="form-field">
        <label for="items">Order Items</label>
        <div v-for="(item, index) in order.items" :key="index" class="item-row">
          <input v-model="item.productID" placeholder="Product ID" />
          <input v-model="item.quantity" placeholder="Quantity" />
          <input v-model="item.itemPrice" placeholder="Product Price" />
          <button type="button" @click="removeItem(index)" class="action-button">❌</button>
        </div>
        <button type="button" @click="addItemField" class="add-item-button">Add Item</button>
      </div>

      <div class="form-buttons">
        <button type="submit" class="submit-button">{{ isCreateMode ? 'Create Order' : 'Save Changes' }}</button>
        <button type="button" class="cancel-button" @click="handleCancel">
          {{ isCreateMode ? 'Reset' : 'Cancel' }}
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useOrderStore } from '../stores/useOrderStore';
import { useContactStore } from '../stores/useContactStore';
import type { Order, OrderItem } from '../services/orderService';
import { Person } from '../services/contactService';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isCreateMode = ref<boolean>(true);
const contactStore = useContactStore();
const orderStore = useOrderStore();
const contacts = computed(() => contactStore.contacts);

const order = ref<Order>({
  orderID: '',
  orderDate: '',
  soldTo: {} as Person,
  billTo: {} as Person,
  shipTo: {} as Person,
  orderValue: 0,
  taxValue: 0,
  currencyCode: '',
  items: [] as OrderItem[],
});

const loadOrder = async () => {
  const orderID = route.params.id as string;
  if (orderID) {
    isCreateMode.value = false;
    try {
      const existingOrder = await orderStore.getOrder(orderID);
      order.value = { ...existingOrder } as Order;
    } catch (err) {
      console.error('Error occured while loading the order', err);
      alert('Error occured while loading the order');
    }
  }
};
const addItemField = async () => {
  const newItem: OrderItem = {
    itemID: '',
    productID: '',
    quantity: 0,
    itemPrice: 0,
  };
  order.value.items.push(newItem);
};

const removeItem = async (index: number) => {
  order.value.items.splice(index, 1);
};

const handleSubmit = async () => {
  try {
    if (isCreateMode.value) {
      await orderStore.addNewOrder(order.value);
      alert('Order saved succesfully!');
      router.push('/orders');
    } else {
      await orderStore.updateOrder(order.value.orderID, order.value);
      alert('Order saved succesfully!');
    }
  } catch (err) {
    console.error('Error occured while creating the order', err);
    alert('Error occured while creating the order');
  }
};

const handleCancel = async () => {
  if (isCreateMode.value) {
    resetForm();
  } else {
    router.push('/orders');
  }
};

const resetForm = () => {
  order.value = {
    orderID: '',
    orderDate: '',
    soldTo: {} as Person,
    billTo: {} as Person,
    shipTo: {} as Person,
    orderValue: 0,
    taxValue: 0,
    currencyCode: '',
    items: [] as OrderItem[],
  };
};

onMounted(() => {
  if (order.value.items.length === 0) {
    addItemField();
  }
  contactStore.loadContacts();
  loadOrder();
});
</script>
<style lang="scss" scoped></style>
