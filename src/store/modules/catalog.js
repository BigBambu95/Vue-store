import { GET_PRODUCTS, GET_CATEGORIES, SET_FILTER, FILTER_PRODUCTS } from '../actions';
import { 
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
  GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE,
  SET_FILTER_REQUEST, FILTER_PRODUCTS_REQUEST
} from '../mutations';

const catalog = {
  state: {
    products: [],
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
    FILTER_PRODUCTS_REQUEST
  },
  actions: {
    GET_PRODUCTS,
    GET_CATEGORIES,
    SET_FILTER,
    FILTER_PRODUCTS
  },
  getters: {
    products(state) {
      return state.products;
    },
    categories(state) {
      return state.categories;
    }
  }
}

export default catalog;