import VueStoreService from '../services/vue-store-service';

const vueStoreService = new VueStoreService();

export const GET_PRODUCTS = ({ commit }, category) => {
  commit('GET_PRODUCTS_REQUEST');
  vueStoreService
    .getCategory(category)
    .then(products => {
      commit('GET_PRODUCTS_SUCCESS', products);
    })
    .catch(err => {
      commit('GET_PRODUCTS_FAILURE', err);
    });
}

export const GET_CATEGORIES = ({ commit }) => {
  commit('GET_CATEGORIES_REQUEST');
  vueStoreService
    .getCategories()
    .then(categories => {
      commit('GET_CATEGORIES_SUCCESS', categories);
    })
    .catch(err => {
      commit('GET_CATEGORIES_FAILURE', err);
    });
}

export const ADD_TO_CART = ({ commit, state }, product) => {
  commit('ADD_TO_CART_REQUEST', product);
}

export const PRODUCT_COUNT_CHANGE = ({ commit }, payload) => {
  commit('PRODUCT_COUNT_CHANGE_REQUEST', payload);
}

