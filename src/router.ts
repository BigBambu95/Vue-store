import Vue from 'vue';
import VueRouter from 'vue-router';

import Catalog from './components/Catalog.vue';
// import Product from './components/Product.vue';
// import Cart from './components/Cart.vue';
// import Category from './components/Category.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/catalog',
    component: Catalog
  },
  // {
  //   name: 'category',
  //   path: '/catalog/:category',
  //   component: Category
  // },
  // {
  //   name: 'product',
  //   path: '/catalog/:category/:id',
  //   component: Product
  // },
  // {
  //   path: '/cart',
  //   component: Cart
  // }
];

const router = new VueRouter({
  routes
});

export default router;