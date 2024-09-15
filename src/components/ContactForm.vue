<template>
  <div class="contact-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-field">
        <label for="firstName">First Name</label>
        <input v-model="contact.firstName" type="text" id="firstName" placeholder="Enter First Name" required />
      </div>

      <div class="form-field">
        <label for="lastName">Last Name</label>
        <input v-model="contact.lastName" type="text" id="lastName" placeholder="Enter Last Name" required />
      </div>

      <div class="form-field">
        <label for="country">Country</label>
        <input v-model="contact.country" type="text" id="country" placeholder="Enter Country" required />
      </div>

      <div class="form-field">
        <label for="city">City</label>
        <input v-model="contact.city" type="text" id="city" placeholder="Enter City" required />
      </div>

      <div class="form-field">
        <label for="streetAddress">Street Address</label>
        <input v-model="contact.streetAddress" type="text" id="streetAddress" placeholder="Enter Street Address" />
      </div>

      <div class="form-field">
        <label for="houseNumber">House Number</label>
        <input v-model="contact.houseNumber" type="text" id="houseNumber" placeholder="Enter House Number" />
      </div>

      <div class="form-field">
        <label for="zip">ZIP Code</label>
        <input v-model="contact.zip" type="text" id="zip" placeholder="Enter ZIP Code" />
      </div>

      <div class="form-buttons">
        <button type="submit" class="submit-button">Save Contact</button>
        <button type="button" class="cancel-button" @click="handleCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useContactStore } from '../stores/useContactStore';

import type { Person } from '../services/contactService';
import router from '../routers';

const contact = ref<Omit<Person, 'id'>>({
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  streetAddress: '',
  houseNumber: '',
  zip: '',
});

const contactStore = useContactStore(); // Store'u kullanarak contact ekleme fonksiyonunu alın

const handleSubmit = async () => {
  try {
    await contactStore.addNewContact(contact.value as Person); // Veriyi store kullanarak veritabanına ekleyin
    alert('Contact saved successfully!'); // Başarı mesajı göster
    router.push('/contacts');
  } catch (err) {
    console.error('Error saving contact:', err);
    alert('An error occurred while saving the contact.');
  }
};

const handleCancel = () => {
  resetForm(); // Cancel butonuna basıldığında formu sıfırla
};

const resetForm = () => {
  contact.value = {
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    streetAddress: '',
    houseNumber: '',
    zip: '',
    extensionFields: {},
  };
};
</script>

<style lang="scss" scoped></style>
