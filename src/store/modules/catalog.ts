import { 
  GET_PRODUCTS, GET_CATEGORIES, 
  SET_FILTER, FILTER_PRODUCTS,
  RESET_FILTER
} from '../actions.ts';

import { 
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
  GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
  SET_FILTER_REQUEST, FILTER_PRODUCTS_REQUEST, FILTER_PRODUCTS_SUCCESS, 
  RESET_FILTER_REQUEST
} from '../mutations.ts';

const catalog = {
  state: {
    products: [],
    filteredProducts: [],
    categories: [],
    filter: {},
    loading: false,
    error: null
  },
  mutations: {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS, 
    GET_CATEGORIES_FAILURE,
    SET_FILTER_REQUEST,
    FILTER_PRODUCTS_REQUEST,
    FILTER_PRODUCTS_SUCCESS,
    RESET_FILTER_REQUEST
  },
  actions: {
    GET_PRODUCTS,
    GET_CATEGORIES,
    SET_FILTER,
    FILTER_PRODUCTS,
    RESET_FILTER
  },
  getters: {
    products(state) {
      return state.filteredProducts;
    },
    categories(state) {
      return state.categories;
    }
  }
}

export default catalog;