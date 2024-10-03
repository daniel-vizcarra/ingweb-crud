import { createApp } from 'vue';
import App from './App.vue';

// Importar Bootstrap y BootstrapVue CSS
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Importar BootstrapVue y sus Iconos
import BootstrapVue3 from 'bootstrap-vue-3';

// Crear la app y usar BootstrapVue
const app = createApp(App);
app.use(BootstrapVue3);
app.mount('#app');
