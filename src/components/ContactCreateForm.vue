<template>
  <div class="form">
    <form @submit.prevent="handleSubmit">
      <div class="form-field">
        <label for="firstName">First Name</label>
        <input v-model="contact.firstName" type="text" id="firstName" required />
      </div>

      <div class="form-field">
        <label for="lastName">Last Name</label>
        <input v-model="contact.lastName" type="text" id="lastName" required />
      </div>

      <div class="form-field">
        <label for="country">Country</label>
        <input v-model="contact.country" type="text" id="country" required />
      </div>

      <div class="form-field">
        <label for="city">City</label>
        <input v-model="contact.city" type="text" id="city" required />
      </div>

      <div class="form-field">
        <label for="streetAddress">Street Address</label>
        <input v-model="contact.streetAddress" type="text" id="streetAddress" />
      </div>

      <div class="form-field">
        <label for="houseNumber">House Number</label>
        <input v-model="contact.houseNumber" type="text" id="houseNumber" />
      </div>

      <div class="form-field">
        <label for="zip">ZIP Code</label>
        <input v-model="contact.zip" type="text" id="zip" />
      </div>

      <div class="form-buttons">
        <button type="submit" class="submit-button">Create Contact</button>
        <button type="button" class="cancel-button" @click="handleCancel">Reset</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useContactStore } from '../stores/useContactStore';
import type { Person } from '../services/contactService';
import router from '../routers';
const contactStore = useContactStore();

const contact = ref<Person>({
  id: '',
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  streetAddress: '',
  houseNumber: '',
  zip: '',
});

const handleSubmit = async () => {
  try {
    await contactStore.addNewContact(contact.value);
    alert('Contact saved successfully!');
    router.push('/contacts');
  } catch (err) {
    console.error('Error saving contact:', err);
    alert('An error occurred while saving the contact.');
  }
};

const handleCancel = () => {
  resetForm();
};

const resetForm = () => {
  contact.value = {
    id: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    streetAddress: '',
    houseNumber: '',
    zip: '',
  };
};
</script>

<style lang="scss" scoped></style>
