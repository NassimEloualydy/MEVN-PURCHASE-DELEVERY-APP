import './assets/style.css'
import './assets/bootstrap-5.0.2-dist/css/bootstrap.min.css'
import './assets/bootstrap-5.0.2-dist/js/bootstrap.bundle.min.js'
// import bootstrap from './assets/bootstrap-5.0.2-dist/js/bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './Router'
import Toaster from '@meforma/vue-toaster'
import DataTable from 'datatables.net-vue3';

createApp(App).component('DataTable', DataTable).use(bootstrap).use(router).use(Toaster).mount('#app')
