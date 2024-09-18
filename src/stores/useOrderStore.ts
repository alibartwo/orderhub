import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  getAllOrders,
  createOrder,
  deleteAllOrders,
  getOrderByID,
  updateOrderByID,
  deleteOrderById,
  Order,
} from '../services/orderService';
import { sampleOrders } from '../data/sampleOrders';

export const useOrderStore = defineStore('order', () => {
  // reactive state properties
  const orders = ref<Order[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const loadOrders = async () => {
    loading.value = true;
    error.value = null;

    try {
      const data = await getAllOrders();
      orders.value = data;
      console.log(data);
    } catch (err) {
      error.value = 'Error occured while loading orders';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const loadSampleData = async () => {
    loading.value = true;
    error.value = null;
    try {
      await deleteAllOrders();
      orders.value = [];

      for (const order of sampleOrders) {
        await createOrder(order);
      }
      await loadOrders();
    } catch (err) {
      error.value = 'Error occured while loading the sample data';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const removeAllOrders = async () => {
    error.value = null;
    try {
      await deleteAllOrders();
      orders.value = [];
    } catch (err) {
      error.value = 'Error occured while deleting orders';
      console.error(err);
    }
  };

  const addNewOrder = async (order: Order) => {
    loading.value = true;
    error.value = null;
    try {
      const newOrder = await createOrder(order);
      orders.value.push(newOrder);
      console.log('New order added succesfully', newOrder);
    } catch (err) {
      error.value = 'Error occured while adding a new order';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const removeOrder = async (id: string) => {
    error.value = null;
    try {
      await deleteOrderById(id);
      orders.value = orders.value.filter((order) => order.orderID !== id);
    } catch (err) {
      error.value = 'Error occured while removing the order';
      console.error(err);
    }
  };

  const getOrder = async (id: string) => {
    loading.value = true;
    error.value = null;
    try {
      const order = await getOrderByID(id);
      return order;
    } catch (err) {
      error.value = 'Error occured while retrieving the order';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateOrder = async (id: string, order: Order) => {
    loading.value = true;
    error.value = null;
    try {
      const updatedOrder = await updateOrderByID(id, order);
      const index = orders.value.findIndex((o) => o.orderID === id);
      if (index !== -1) {
        orders.value[index] = updatedOrder;
      }
    } catch (err) {
      error.value = 'Error occured while updating the order';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    orders,
    loading,
    error,
    loadOrders,
    loadSampleData,
    removeAllOrders,
    addNewOrder,
    removeOrder,
    getOrder,
    updateOrder,
  };
});
