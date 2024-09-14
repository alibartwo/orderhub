import { createApp } from 'vue';
import './assets/styles.scss';
import router from './routers';
import AppLayout from './layout/AppLayout.vue';

const app = createApp(AppLayout);
app.use(router);
app.mount('#app');
