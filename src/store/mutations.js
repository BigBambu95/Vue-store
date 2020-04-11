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

export const GET_CATEGORIES_REQUEST = (state) => {
  state.loading = true;
}

export const GET_CATEGORIES_SUCCESS = (state, categories) => {
  state.categories = categories;
  state.loading = false;
}

export const GET_CATEGORIES_FAILURE = (state, err) => {
  state.error = err;
}

export const ADD_TO_CART_REQUEST = (state, product) => {
  state.products.push(product);
  state.productCount += 1;
  state.sum = state.products.map(product => product.price).reduce((price, sum) => sum + price);
}