import { ADD_TO_CART, PRODUCT_COUNT_CHANGE } from '../actions';
import { ADD_TO_CART_REQUEST, PRODUCT_COUNT_CHANGE_REQUEST } from '../mutations';

const cart = {
  state: {
    products: [],
    loading: false,
    error: null,
    productCount: 0,
    sum: 0
  },
  actions: {
    ADD_TO_CART,
    PRODUCT_COUNT_CHANGE
  },
  mutations: {
    ADD_TO_CART_REQUEST,
    PRODUCT_COUNT_CHANGE_REQUEST
  },
}

export default cart;