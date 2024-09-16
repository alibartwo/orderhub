import axios, { AxiosResponse } from 'axios';
import { Person } from './contactService';

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

export interface OrderItem {
  itemID: string;
  productID: string;
  quantity: number;
  itemPrice: number;
}

const API_BASE_URL = 'http://188.245.151.183:8081/api/v1/order';

const getAllOrders = async (): Promise<Order[]> => {
  try {
    const response: AxiosResponse<Order[]> = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error occured while fetching orders', error);
    throw error;
  }
};

const createOrder = async (order: Order): Promise<Order> => {
  try {
    const response: AxiosResponse<Order> = await axios.post(API_BASE_URL, order);
    return response.data;
  } catch (error) {
    console.error('Error occured while creating order', error);
    throw error;
  }
};

const deleteAllOrders = async (): Promise<void> => {
  try {
    await axios.delete(API_BASE_URL);
  } catch (error) {
    console.error('Error occured while deleting orders', error);
    throw error;
  }
};

const getOrderByID = async (id: string): Promise<Order> => {
  try {
    const response: AxiosResponse<Order> = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error occured while fetching the order', error);
    throw error;
  }
};

const updateOrderByID = async (id: string, order: Order): Promise<Order> => {
  try {
    const response: AxiosResponse<Order> = await axios.put(`${API_BASE_URL}/${id}`, order);
    return response.data;
  } catch (error) {
    console.error('Error occured while updating the order', error);
    throw error;
  }
};

const deleteOrderById = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error occured while removing the order', error);
    throw error;
  }
};

export { getAllOrders, createOrder, deleteAllOrders, getOrderByID, updateOrderByID, deleteOrderById };
