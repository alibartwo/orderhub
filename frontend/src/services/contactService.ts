import axios, { AxiosResponse } from 'axios';

// define the Person interface for the API data structure
export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  streetAddress?: string;
  houseNumber?: string;
  zip?: string;
  extensionFields?: Record<string, any>;
}

const API_BASE_URL = import.meta.env.VITE_CONTACT_SERVICE_URL || 'http://localhost:8080/api/v1/person';

// create an axios instance with a base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAllContacts = async (): Promise<Person[]> => {
  try {
    const response: AxiosResponse<Person[]> = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error('Error while trying retrieve contacts:', error);
    throw error;
  }
};

const createContact = async (contact: Person): Promise<Person> => {
  try {
    const response: AxiosResponse<Person> = await apiClient.post('/', contact);
    return response.data;
  } catch (error) {
    console.error('Error occured while creating a contact', error);
    throw error;
  }
};

const deleteAllContacts = async (): Promise<void> => {
  try {
    await axios.delete(API_BASE_URL);
  } catch (error) {
    console.error('Error occured while deleting all contacts', error);
    throw error;
  }
};

const getContactByID = async (id: string): Promise<Person> => {
  try {
    const response: AxiosResponse<Person> = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error occured while retrieving a contact by ID:', error);
    throw error;
  }
};

const updateContactByID = async (id: string, contact: Person): Promise<Person> => {
  try {
    const response: AxiosResponse<Person> = await apiClient.put(`/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error('Error occured while updating a contact:', error);
    throw error;
  }
};

const patchContact = async (id: string, contact: Partial<Person>): Promise<Person> => {
  try {
    const response: AxiosResponse<Person> = await apiClient.patch(`/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error('Error occured while patching a contact:', error);
    throw error;
  }
};

const deleteContact = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error('Error occured while deleting a contact', error);
    throw error;
  }
};
export {
  getAllContacts,
  createContact,
  deleteAllContacts,
  getContactByID,
  updateContactByID,
  patchContact,
  deleteContact,
};
