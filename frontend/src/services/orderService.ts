import axios, { AxiosResponse } from 'axios';
import { Person } from './contactService';

// define the Order interface for the API data structure
export interface Order {
  orderID: string;
  orderDate: string;
  soldTo: Person;
  billTo: Person;
  shipTo: Person;
  orderValue: number;
  taxValue: number;
  currencyCode: string;
  items: OrderItem[];
}
// define the Order Item interface for the API data structure
export interface OrderItem {
  itemID: string;
  productID: string;
  quantity: number;
  itemPrice: number;
}

const API_BASE_URL = import.meta.env.VITE_ORDER_SERVICE_URL || 'http://localhost:8081/api/v1/order';

// create an axios instance with a base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAllOrders = async (): Promise<Order[]> => {
  try {
    const response: AxiosResponse<Order[]> = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error('Error occured while fetching orders', error);
    throw error;
  }
};

const createOrder = async (order: Order): Promise<Order> => {
  try {
    const response: AxiosResponse<Order> = await apiClient.post('/', order);
    return response.data;
  } catch (error) {
    console.error('Error occured while creating order', error);
    throw error;
  }
};

const deleteAllOrders = async (): Promise<void> => {
  try {
    await apiClient.delete('/');
  } catch (error) {
    console.error('Error occured while deleting orders', error);
    throw error;
  }
};

const getOrderByID = async (id: string): Promise<Order> => {
  try {
    const response: AxiosResponse<Order> = await apiClient.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error occured while fetching the order', error);
    throw error;
  }
};

const updateOrderByID = async (id: string, order: Order): Promise<Order> => {
  try {
    const response: AxiosResponse<Order> = await apiClient.put(`/${id}`, order);
    return response.data;
  } catch (error) {
    console.error('Error occured while updating the order', error);
    throw error;
  }
};

const deleteOrderById = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error('Error occured while removing the order', error);
    throw error;
  }
};

export { getAllOrders, createOrder, deleteAllOrders, getOrderByID, updateOrderByID, deleteOrderById };
