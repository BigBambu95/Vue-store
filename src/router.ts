import Vue from 'vue';
import VueRouter from 'vue-router';

const Catalog = () => import('./components/Catalog.vue');
const Category = () => import('./components/Category.vue');
const Product = () => import('./components/Product.vue');
const Cart = () => import('./components/Cart.vue');

Vue.use(VueRouter);

const routes = [
  {
    name: 'catalog',
    path: '/catalog',
    component: Catalog,
    meta: {
      breadcrumb: 'catalog'
    }
  },
  {
    name: 'category',
    path: '/catalog/:category',
    component: Category,
    meta: {
      breadcrumb: '/catalog/:category'
    }
  },
  {
    name: 'product',
    path: '/catalog/:category/:id',
    component: Product,
    meta: {
      breadcrumb: ''
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: Cart,
    meta: {
      breadcrumb: 'cart'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;