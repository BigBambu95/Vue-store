import {
  GET_PRODUCT
} from '../actions.ts';

import {
  GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE
} from '../mutations.ts';

const product = {
  state: {
    data: {},
    loading: false,
    error: null
  },
  actions: {
    GET_PRODUCT
  },
  mutations: {
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAILURE
  }
}

export default product;