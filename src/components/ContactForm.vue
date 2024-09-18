<template>
  <div class="form">
    <form @submit.prevent="handleSubmit">
      <!-- inputs for form fields-->
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

      <!-- buttons for form operations -->
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
import { useSchemas } from '../composables/useSchemas';

const route = useRoute();
const router = useRouter();
const contactStore = useContactStore();
const { initialContact } = useSchemas();

// determine if we are create or edit mode
const isCreateMode = ref<boolean>(true);

const contact = ref({ ...initialContact.value });

// if an ID comes from the URL, switch the mode and load the contact data
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

// handle form submission based on create or update mode
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

// handle cancel or reset button click
const handleCancel = async () => {
  if (isCreateMode.value) {
    resetForm();
  } else {
    router.push('/contacts');
  }
};

const resetForm = () => {
  contact.value = { ...initialContact.value };
};

// on component mount, determine if is it create mode or edit mode
onMounted(() => {
  loadContact();
});
</script>
<style lang="scss"></style>
