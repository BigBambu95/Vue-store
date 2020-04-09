import Vue from 'vue';
import Vuex from 'vuex';

import VueStoreService from '../services/vue-store-service';

Vue.use(Vuex);
const vueStoreService = new VueStoreService();

const store = new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    }
  },
  actions: {
    GET_PRODUCTS({ commit }) {
      vueStoreService
        .getProducts()
        .then(products => {
          commit('SET_PRODUCTS', products);
        })
        .catch(err => console.error(err));
    }
  },
  getters: {
    products(state) {
      return state.products;
    }
  }
});

export default store;