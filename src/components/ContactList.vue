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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useContactStore } from '../stores/useContactStore';

const contactStore = useContactStore();
const contacts = computed(() => contactStore.contacts);
const loading = computed(() => contactStore.loading);
const error = computed(() => contactStore.error);

onMounted(() => {
  contactStore.loadContacts();
});

const formattedAddress = (contact: any) => {
  return `${contact.country}, ${contact.city}, ${contact.streetAddress}, ${contact.houseNumber}, zip:${contact.zip}`;
};
</script>

<style scoped></style>
