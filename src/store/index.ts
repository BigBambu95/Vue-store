import Vue from 'vue';
import * as Vuex from 'vuex';
import { createStore } from 'vuex-smart-module';

import { rootModule } from './modules';

Vue.use(Vuex);

const store = createStore(
  rootModule,
  {
    strict: process.env.NODE_ENV !== 'production'
  }
)

export default store;