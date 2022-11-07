import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
var VueScrollTo = require('vue-scrollto');

createApp(App).use(router).use(VueScrollTo).mount('#app')
