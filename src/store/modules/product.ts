import { Getters, Actions, Mutations, Module } from 'vuex-smart-module';

import VueStoreService from '../services/vue-store-service';

const vueStoreService = new VueStoreService();

interface StateTypes {
  data: ProductTypes;
  loading: boolean;
  error: object;
}


class ProductState implements StateTypes {
  data = {};
  loading = false;
  error = {};
}

class ProductGetters extends Getters<ProductState> {}

class ProductMutations extends Mutations<ProductState> {

  GET_PRODUCT_REQUEST = () => {
    this.state.loading = true;
  }
  
  GET_PRODUCT_SUCCESS = (product: ProductTypes) => {
    this.state.data = product;
    this.state.loading = false;
  }
  
  GET_PRODUCT_FAILURE = (err: object) => {
    this.state.loading = false;
    this.state.error = err;
  }
}

class ProductActions extends Actions<ProductState, ProductGetters, ProductMutations, ProductActions> {
  GET_PRODUCT = (payload: { category: string, id: number }) => {
    this.commit('GET_PRODUCT_REQUEST');
    vueStoreService
      .getProduct(payload.category, payload.id)
      .then((product: object) => {
        this.commit('GET_PRODUCT_SUCCESS', product);
      })
      .catch((err: object) => {
        this.commit('GET_PRODUCT_FAILURE', err);
      });
  }
}


export default new Module({
  state: ProductState,
  actions: ProductActions,
  mutations: ProductMutations,
  getters: ProductGetters
});

