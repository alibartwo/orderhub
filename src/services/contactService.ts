import axios, { AxiosResponse } from 'axios';

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

const API_BASE_URL = 'http://188.245.151.183:8080/api/v1/person';

const getAllContacts = async (): Promise<Person[]> => {
  try {
    const response: AxiosResponse<Person[]> = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error while trying retrieve contacts:', error);
    throw error;
  }
};

const createContact = async (contact: Person): Promise<Person> => {
  try {
    const response: AxiosResponse<Person> = await axios.post(API_BASE_URL, contact);
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
    console.error('Error occured while deletinn all contacts', error);
    throw error;
  }
};

const getContactByID = async (id: string): Promise<Person> => {
  try {
    const response: AxiosResponse<Person> = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error occured while retrieving a contact by ID:', error);
    throw error;
  }
};

const updateContactByID = async (id: string, contact: Person): Promise<Person> => {
  try {
    const response: AxiosResponse<Person> = await axios.put(`${API_BASE_URL}/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error('Error occured while updating a contact:', error);
    throw error;
  }
};

const patchContact = async (id: string, contact: Partial<Person>): Promise<Person> => {
  try {
    const response: AxiosResponse<Person> = await axios.patch(`${API_BASE_URL}/${id}`, contact);
    return response.data;
  } catch (error) {
    console.error('Error occured while patching a contact:', error);
    throw error;
  }
};

const deleteContact = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error occured while deleting a conctact', error);
    throw error;
  }
};
export { getAllContacts, createContact, deleteAllContacts, getContactByID, updateContactByID, patchContact, deleteContact };
