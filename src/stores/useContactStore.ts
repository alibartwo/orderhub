import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getAllContacts,
  createContact,
  deleteAllContacts,
  getContactByID,
  updateContactByID,
  deleteContact,
  Person,
} from '../services/contactService';
import { sampleContacts } from '../data/sampleContacts';

export const useContactStore = defineStore('contact', () => {
  // reactive state properties
  const contacts = ref<Person[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const loadContacts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await getAllContacts();
      contacts.value = data;
      console.log(data);
    } catch (err) {
      error.value = 'Error occured while loading contacts';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const loadSampleData = async () => {
    loading.value = true;
    error.value = null;
    try {
      await deleteAllContacts();
      contacts.value = [];

      for (const contact of sampleContacts) {
        await createContact(contact);
      }
      await loadContacts();
    } catch (err) {
      error.value = 'Error occured while loading the sample data';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const removeAllContacts = async () => {
    try {
      await deleteAllContacts();
      contacts.value = [];
    } catch (err) {
      error.value = 'Error occured while removing the contacts';
      console.error(err);
    }
  };

  const addNewContact = async (contact: Person) => {
    loading.value = true;
    error.value = null;

    try {
      const newContact = await createContact(contact);
      contacts.value.push(newContact);
      console.log('New contact created succesfully:', newContact);
    } catch (err) {
      error.value = 'Error occured while creating new contact';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const removeContact = async (id: string) => {
    try {
      await deleteContact(id);
      contacts.value = contacts.value.filter((contact) => contact.id !== id);
    } catch (err) {
      error.value = 'Error occured while deleting the contact';
      console.error(err);
    }
  };

  const getContact = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const contact = await getContactByID(id);
      return contact;
    } catch (err) {
      error.value = 'Error occured while fetching the contact';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateContact = async (id: string, contact: Person) => {
    loading.value = true;
    error.value = null;

    try {
      const updatedContact = await updateContactByID(id, contact);
      const index = contacts.value.findIndex((c) => c.id === id);

      if (index !== -1) {
        contacts.value[index] = updatedContact;
      }
    } catch (err) {
      error.value = 'Error occured while updating the contact';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  return {
    contacts,
    loading,
    error,
    loadContacts,
    removeAllContacts,
    loadSampleData,
    addNewContact,
    removeContact,
    getContact,
    updateContact,
  };
});
