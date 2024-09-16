import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ContactsView from '../views/ContactsView.vue';
import OrdersView from '../views/OrdersView.vue';
import ContactCreateView from '../views/ContactCreateView.vue';
import ContactEditView from '../views/ContactEditView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/contacts', name: 'Contacts', component: ContactsView },
  { path: '/orders', name: 'Orders', component: OrdersView },
  { path: '/create-contact', name: 'Create Contact', component: ContactCreateView },
  { path: '/edit-contact/:id', name: 'Edit Contact', component: ContactEditView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
