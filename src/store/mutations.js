export const GET_PRODUCTS_REQUEST = (state) => {
  state.loading = true;
}

export const GET_PRODUCTS_SUCCESS = (state, products) => {
  state.products = products;
  state.loading = false;
}

export const GET_PRODUCTS_FAILURE = (state, err) => {
  state.error = err;
}

export const ADD_TO_CART_REQUEST = (state, product) => {
  state.products.push(product);
}