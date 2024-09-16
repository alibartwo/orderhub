<template>
  <div class="form">
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
        <button type="submit" class="submit-button">Save Changes</button>
        <button type="button" class="cancel-button" @click="handleCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useContactStore } from '../stores/useContactStore';
import type { Person } from '../services/contactService';

const router = useRouter();
const route = useRoute();
const contactStore = useContactStore();

const contactId = route.params.id as string;

const contact = ref<Partial<Person>>({
  id: contactId,
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  streetAddress: '',
  houseNumber: '',
  zip: '',
  extensionFields: {},
});

const loadContact = async () => {
  try {
    const data = await contactStore.getContact(contactId);
    contact.value = { ...data };
  } catch (err) {
    console.error('Error loading contact:', err);
  }
};

onMounted(loadContact);

const handleSubmit = async () => {
  try {
    await contactStore.updateContact(contactId, contact.value as Person);
    alert('Contact updated successfully!');
  } catch (err) {
    console.error('Error updating contact:', err);
    alert('An error occurred while updating the contact.');
  }
};

const handleCancel = () => {
  router.push('/contacts');
};
</script>

<style lang="scss" scoped></style>
