import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
var VueScrollTo = require('vue-scrollto');
import titleMixin from './components/titleMixin'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css"; 
createApp(App).use(router).use(VueScrollTo).component("infinite-loading", InfiniteLoading).mixin(titleMixin).mount('#app')
