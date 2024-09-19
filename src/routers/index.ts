import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ContactsView from '../views/ContactsView.vue';
import OrdersView from '../views/OrdersView.vue';
import ContactCreateView from '../views/ContactCreateView.vue';
import ContactEditView from '../views/ContactEditView.vue';
import OrderCreateView from '../views/OrderCreateView.vue';
import OrderEditView from '../views/OrderEditView.vue';
import OrderDetailsView from '../views/OrderDetailsView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/contacts', name: 'Contacts', component: ContactsView },
  { path: '/orders', name: 'Orders', component: OrdersView },
  { path: '/create-contact', name: 'Create Contact', component: ContactCreateView },
  { path: '/edit-contact/:id', name: 'Edit Contact', component: ContactEditView },
  { path: '/create-order', name: 'Create Order', component: OrderCreateView },
  { path: '/edit-order/:id', name: 'Edit Order', component: OrderEditView },
  { path: '/order-details/:id', name: 'Order Details', component: OrderDetailsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
