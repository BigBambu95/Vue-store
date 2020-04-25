import { Module, Mutations, Actions, Getters, createMapper } from 'vuex-smart-module';

import { catalog } from './catalog';
import { cart } from './cart';
import { product } from './product';

class RootState {}
class RootMutations extends Mutations<RootState> {}
class RootGetters extends Getters<RootState> {}
class RootActions extends Actions<RootState, RootGetters, RootMutations, RootActions> {}

export const rootModule = new Module({
  namespaced: false,
  state: RootState,
  mutations: RootMutations,
  actions: RootActions,
  getters: RootGetters,
  modules: {
    cart,
    catalog,
    product
  }
});

export const rootMapper = createMapper(rootModule);