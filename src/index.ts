import Vue from 'vue';
import router from './router';
import store from './store';

import App from './components/App.vue';

new Vue({
  el: '#root',
  render: (h) => h(App), 
  store,
  router
});