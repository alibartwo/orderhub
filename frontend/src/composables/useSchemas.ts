// this composable provides initial schema objects for use within the application.

import { ref } from 'vue';
import { Person } from '../services/contactService';
import { Order, OrderItem } from '../services/orderService';

export function useSchemas() {
  const initialContact = ref<Person>({
    id: '',
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    streetAddress: '',
    houseNumber: '',
    zip: '',
  });

  const initialOrder = ref<Order>({
    orderID: '',
    orderDate: '',
    soldTo: {} as Person,
    billTo: {} as Person,
    shipTo: {} as Person,
    orderValue: 0,
    taxValue: 0,
    currencyCode: '',
    items: [] as OrderItem[],
  });

  const initialOrderItem = ref<OrderItem>({
    itemID: '',
    productID: '',
    quantity: 0,
    itemPrice: 0,
  });

  return { initialContact, initialOrder, initialOrderItem };
}
