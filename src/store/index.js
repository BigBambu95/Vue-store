import Vue from 'vue';
import Vuex from 'vuex';

import catalog from './modules/catalog';
import cart from './modules/cart';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    catalog,
    cart
  }
});

export default store;