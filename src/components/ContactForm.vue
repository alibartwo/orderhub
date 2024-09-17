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
        <button type="submit" class="submit-button">{{ isCreateMode ? 'Create Contact' : 'Save Changes' }}</button>
        <button type="button" class="cancel-button" @click="handleCancel">
          {{ isCreateMode ? 'Reset' : 'Cancel' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useContactStore } from '../stores/useContactStore';
import { Person } from '../services/contactService';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const contactStore = useContactStore();
const isCreateMode = ref<boolean>(true);

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

const loadContact = async () => {
  const contactID = route.params.id as string;
  if (contactID) {
    isCreateMode.value = false;
    try {
      const existingContact = await contactStore.getContact(contactID);
      contact.value = { ...existingContact } as Person;
    } catch (err) {
      console.error('Error occured while loading the contact:', err);
      alert('Error occured while loading the contact');
    }
  }
};
const handleSubmit = async () => {
  try {
    if (isCreateMode.value) {
      await contactStore.addNewContact(contact.value);
      alert('Contact saved succesfully');
      router.push('/contacts');
    } else {
      await contactStore.updateContact(contact.value.id, contact.value);
      alert('Contact saved succesfully');
    }
  } catch (err) {
    console.error('Error occured while handling the submission');
    alert('An error occured');
  }
};
const handleCancel = async () => {
  if (isCreateMode.value) {
    resetForm();
  } else {
    router.push('/contacts');
  }
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
onMounted(() => {
  loadContact();
});
</script>
<style lang="scss"></style>
