import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
var VueScrollTo = require('vue-scrollto');
import titleMixin from './components/titleMixin'

createApp(App).use(router).use(VueScrollTo).mixin(titleMixin).mount('#app')
