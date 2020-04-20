import Vue from 'vue';
import router from './router.ts';
import store from './store/index.ts';

import App from './components/App.vue';

new Vue({
  el: '#root',
  render: (h) => h(App), 
  store,
  router
});