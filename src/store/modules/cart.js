import { ADD_TO_CART } from '../actions';
import { ADD_TO_CART_REQUEST } from '../mutations';

const cart = {
  state: {
    products: [],
    loading: false,
    error: null,
    productCount: 0,
    sum: 0
  },
  actions: {
    ADD_TO_CART
  },
  mutations: {
    ADD_TO_CART_REQUEST
  }
}

export default cart;