import Vue from 'vue';
import router from './router';
import store from './store';

import App from './components/App.vue';
import { localizationServicePlugin } from './plugins';

Vue.use(localizationServicePlugin);

new Vue({
  el: '#root',
  render: (h) => h(App), 
  store,
  router
});