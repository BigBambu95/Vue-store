import Vue from 'vue';
import VueRouter from 'vue-router';

const CatalogPage = () => import('./pages/Catalog.vue');
const CategoryList = () => import('./components/category-list.vue');
const CategoryPage = () => import('./pages/Category.vue');
const Category = () => import('./components/Category.vue');
const Product = () => import('./components/Product.vue');
const Cart = () => import('./components/Cart.vue');

Vue.use(VueRouter);

const routes = [
  {
    name: 'catalog',
    path: '/catalog',
    component: CatalogPage,
    meta: {
      bcLinkText: 'catalog',
      bcLinkTo: 'catalog',
      isBreadcrumbs: true
    },
    children: [
      {
        name: 'categories',
        path: '/',
        component: CategoryList
      },
      {
        name: 'category',
        path: '/catalog/:category',
        component: CategoryPage,
        meta: {
          bcLinkText: function() {
            return this.$route.params.category;
          },
          bcLinkTo: function() {
            return this.$route.name;
          },
          isBreadcrumbs: true
        },
        children: [
          {
            name: 'product-list',
            path: '/',
            component: Category
          },
          {
            name: 'product',
            path: '/catalog/:category/:product',
            component: Product,
            meta: {
              bcLinkText: function() {
                return this.$route.params.product;
              },
              bcLinkTo: function() {
                return this.$route.name;
              },
              isBreadcrumbs: true
            }
          },
        ]
      },

    ]
  },
  {
    name: 'cart',
    path: '/cart',
    component: Cart,
    meta: {
      isBreadcrumbs: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;