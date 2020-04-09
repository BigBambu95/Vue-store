import Vue from 'vue';
import VueRouter from 'vue-router';

import Catalog from './components/Catalog.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/catalog',
    component: Catalog
  }
];

const router = new VueRouter({
  routes
});

export default router;