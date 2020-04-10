import Vue from 'vue';
import VueRouter from 'vue-router';

import Catalog from './components/Catalog.vue';
import Product from './components/Product.vue';
import Cart from './components/Cart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/catalog',
    component: Catalog
  },
  {
    path: '/catalog/:id',
    component: Product
  },
  {
    path: '/cart',
    component: Cart
  }
];

const router = new VueRouter({
  routes
});

export default router;