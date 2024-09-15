import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getAllContacts,
  createContact,
  deleteAllContacts,
  getContactByID,
  updateContact,
  patchContact,
  deleteContact,
  Person,
} from '../services/contactService';
import { sampleContacts } from '../data/sampleContacts';

export const useContactStore = defineStore('contact', () => {
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
      console.log(err);
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
      console.log(err);
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
      console.log(err);
    }
  };

  const addNewContact = async (contact: Person) => {
    loading.value = true;
    error.value = null;

    try {
      const newContact = await createContact(contact);
      contacts.value.push(newContact);
      console.log('New contact created succesfully:', newContact)
    } catch (err) {
      error.value = 'Error occured while creating new contact'
      console.log(err)
    }
  }

  return { contacts, loading, error, loadContacts, removeAllContacts, loadSampleData, addNewContact };
});
