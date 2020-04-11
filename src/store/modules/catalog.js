import { GET_PRODUCTS, GET_CATEGORIES } from '../actions';
import { 
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
  GET_CATEGORIES_REQUEST, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE
} from '../mutations';

const catalog = {
  state: {
    products: [],
    categories: [],
    loading: false,
    error: null
  },
  mutations: {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS, 
    GET_CATEGORIES_FAILURE
  },
  actions: {
    GET_PRODUCTS,
    GET_CATEGORIES
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