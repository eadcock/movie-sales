import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import axios from 'axios';
import router from './router.js';
import VueRouter from 'vue-router';
import Sticky from 'vue-sticky-directive'
import VueSession from 'vue-session';
import VueResource from 'vue-resource';

import 'vue-awesome/icons';
import VueAwesome from 'vue-awesome/components/Icon';

Vue.component('v-icon', VueAwesome);

Vue.use(VueResource);
Vue.use(VueSession);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Sticky);

Vue.use(VueRouter);

Vue.config.productionTip = false;

axios.get('/api/csrf').then((response) => {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrfToken;
  Vue.http.interceptors.push(function(request) {
    request.headers.set('X-CSRF-TOKEN', response.data.csrfToken);
  });
  console.log(response.data.csrfToken);
}, (err) => {
  console.log(err);
});

const app = new Vue({
  router,
  render: h => h(App),
});

app.$mount('#app');