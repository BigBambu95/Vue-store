import VueStoreService from '../services/vue-store-service';

const vueStoreService = new VueStoreService();

export const GET_PRODUCTS = ({ commit }) => {
  commit('GET_PRODUCTS_REQUEST');
  vueStoreService
    .getProducts()
    .then(products => {
      commit('GET_PRODUCTS_SUCCESS', products);
    })
    .catch(err => {
      commit('GET_PRODUCTS_FAILURE', err);
    });
}