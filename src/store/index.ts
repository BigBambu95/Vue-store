import Vue from 'vue';
import * as Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'

import cart from './modules/cart.ts';


Vue.use(Vuex);

const store = createStore(
  cart,
  {
    strict: process.env.NODE_ENV !== 'production'
  }
)

export default store;