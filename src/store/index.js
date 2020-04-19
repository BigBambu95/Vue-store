import Vue from 'vue';
import Vuex from 'vuex';

import catalog from './modules/catalog';
import cart from './modules/cart';
import product from './modules/product';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    catalog,
    cart,
    product
  },
  strict: process.env.NODE_ENV !== 'production'
});

export default store;