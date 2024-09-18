<template>
  <div class="form">
    <form @submit.prevent="handleSubmit">
      <!-- inputs for form fields-->
      <div class="form-field">
        <label for="orderDate">Order Date</label>
        <input v-model="order.orderDate" type="text" id="orderDate" />
      </div>

      <div class="form-field">
        <label for="soldTo">Sold To</label>
        <div class="select-button-container">
          <select v-model="order.soldTo" id="soldto">
            <option v-for="contact in contacts" :key="contact.id" :value="contact">
              {{ contact.firstName }} {{ contact.lastName }}
            </option>
          </select>
          <button type="button" @click="goToCreateContact" class="action-button">➕</button>
        </div>
      </div>

      <div class="form-field">
        <label for="billTo">Bill To</label>
        <div class="select-button-container">
          <select v-model="order.billTo" id="billTo">
            <option v-for="contact in contacts" :key="contact.id" :value="contact">
              {{ contact.firstName }} {{ contact.lastName }}
            </option>
          </select>
          <button type="button" @click="goToCreateContact" class="action-button">➕</button>
        </div>
      </div>

      <div class="form-field">
        <label for="shipTo">Ship To</label>
        <div class="select-button-container">
          <select v-model="order.shipTo" id="shipTo">
            <option v-for="contact in contacts" :key="contact.id" :value="contact">
              {{ contact.firstName }} {{ contact.lastName }}
            </option>
          </select>
          <button type="button" @click="goToCreateContact" class="action-button">➕</button>
        </div>
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
        <label for="currencyCode">Currency Code</label>
        <select v-model="order.currencyCode" id="currencyCode">
          <option>USD</option>
          <option>EUR</option>
          <option>TRY</option>
        </select>
      </div>

      <div class="form-field">
        <label for="items">Order Items</label>
        <!-- loop for adding order items dynamically -->
        <div v-for="(item, index) in order.items" :key="index" class="item-row">
          <input v-model="item.productID" placeholder="Product ID" />
          <input v-model="item.quantity" placeholder="Quantity" />
          <input v-model="item.itemPrice" placeholder="Product Price" />
          <!-- button to delete current order item -->
          <button type="button" @click="removeItem(index)" class="action-button">❌</button>
        </div>
        <!-- button to add new order item -->
        <button type="button" @click="addItemField" class="add-item-button">Add Item</button>
      </div>

      <!-- buttons for form operations -->
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
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '../stores/useOrderStore';
import { useContactStore } from '../stores/useContactStore';
import type { Order, OrderItem } from '../services/orderService';
import { useSchemas } from '../composables/useSchemas';
const { initialOrder, initialOrderItem } = useSchemas();

const router = useRouter();
const route = useRoute();
const contactStore = useContactStore();
const orderStore = useOrderStore();
const contacts = computed(() => contactStore.contacts);

// determine if we are create or edit mode
const isCreateMode = ref<boolean>(true);

const order = ref({ ...initialOrder.value });

// if an ID comes from the URL, switch the mode and load the contact data
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
  const newItem: OrderItem = { ...initialOrderItem.value };
  order.value.items.push(newItem);
};

const removeItem = async (index: number) => {
  order.value.items.splice(index, 1);
};

const goToCreateContact = () => {
  router.push('create-contact');
};

// handle form submission based on create or update mode
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

// handle cancel or reset button click
const handleCancel = async () => {
  if (isCreateMode.value) {
    resetForm();
  } else {
    router.push('/orders');
  }
};

const resetForm = () => {
  order.value = { ...initialOrder.value };
};

// on component mount, load contacts to getting contacts for select options, run loadOrder function to determine if it is crete or edit mode
onMounted(() => {
  if (order.value.items.length === 0) {
    addItemField();
  }
  contactStore.loadContacts();
  loadOrder();
});
</script>
<style lang="scss" scoped></style>
