<template>
  <div class="contact-list">
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>

    <!-- contact list shown only with not loading and no errors -->
    <table v-if="!loading && !error">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- loop through each contact and display them in a row -->
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.id }}</td>
          <td>{{ contact.firstName }}</td>
          <td>{{ contact.lastName }}</td>
          <td>
            {{ formattedAddress(contact) }}
          </td>
          <td>
            <button @click="editContact(contact.id)" class="action-button">✏️</button>
            <button @click="deleteContact(contact.id)" class="action-button">❌</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useContactStore } from '../stores/useContactStore';
import { useRouter } from 'vue-router';
import { useFormatters } from '../composables/useFormatters';
const { formattedAddress } = useFormatters();

const router = useRouter();
const contactStore = useContactStore();

// computed properties for reactive state management
const contacts = computed(() => contactStore.contacts);
const loading = computed(() => contactStore.loading);
const error = computed(() => contactStore.error);

// function to navigate to edit page
const editContact = (id: string) => {
  router.push(`/edit-contact/${id}`);
};

// function to delete a contact after confirmation
const deleteContact = (id: string) => {
  const confirmation = confirm(`Are you sure you want to delete the contact: ${id}? This action cannot be undone.`);
  if (confirmation) {
    contactStore.removeContact(id);
  }
};

// load the contacts when the component is mounted
onMounted(() => {
  contactStore.loadContacts();
});
</script>

<style scoped></style>
