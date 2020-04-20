import { Actions } from 'vuex-smart-module';
import VueStoreService from '../services/vue-store-service.ts';

const vueStoreService = new VueStoreService();

class ShopActions extends Actions<ShopActions> {

  GET_PRODUCTS = (category: string) => {
    this.commit('GET_PRODUCTS_REQUEST');
    vueStoreService
      .getCategory(category)
      .then((products: Array<object>) => {
        this.commit('GET_PRODUCTS_SUCCESS', products);
      })
      .catch((err: object) => {
        this.commit('GET_PRODUCTS_FAILURE', err);
      });
  }

  GET_CATEGORIES = () => {
    this.commit('GET_CATEGORIES_REQUEST');
    vueStoreService
      .getCategories()
      .then((categories: Array<object>) => {
        this.commit('GET_CATEGORIES_SUCCESS', categories);
      })
      .catch((err: object) => {
        this.commit('GET_CATEGORIES_FAILURE', err);
      });
  }

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
  

  
  SET_FILTER = (payload: object) => {
    this.commit('SET_FILTER_REQUEST', payload);
    this.commit('FILTER_PRODUCTS_REQUEST');
    setTimeout(() => {
      this.commit('FILTER_PRODUCTS_SUCCESS');
    }, 750);
  }
  
  FILTER_PRODUCTS = () => {
    this.commit('FILTER_PRODUCTS_REQUEST');
  }
  
  RESET_FILTER = () => {
    this.commit('RESET_FILTER_REQUEST');
  }
}

export default ShopActions;



