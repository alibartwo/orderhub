import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './assets/styles.scss';
import router from './routers';
import AppLayout from './layout/AppLayout.vue';

const pinia = createPinia();
const app = createApp(AppLayout);

app.use(pinia);
app.use(router);
app.mount('#app');
