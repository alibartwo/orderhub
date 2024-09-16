<template>
  <div class="contact-list">
    <p v-if="loading">Loading...</p>
    <p v-if="error">{{ error }}</p>
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
const contacts = computed(() => contactStore.contacts);
const loading = computed(() => contactStore.loading);
const error = computed(() => contactStore.error);

const deleteContact = (id: string) => {
  const confirmation = confirm(`Are you sure you want to delete the contact: ${id}? This action cannot be undone.`);
  if (confirmation) {
    contactStore.removeContact(id);
  }
};

const editContact = (id: string) => {
  router.push(`/edit-contact/${id}`);
};

onMounted(() => {
  contactStore.loadContacts();
});
</script>

<style scoped></style>
