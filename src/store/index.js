import Vue from 'vue';
import Vuex from 'vuex';

import { GET_PRODUCTS } from './actions';
import { GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [],
    loading: false,
    error: null
  },
  mutations: {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE
  },
  actions: {
    GET_PRODUCTS
  },
  getters: {
    products(state) {
      return state.products;
    }
  }
});

export default store;