export const GET_PRODUCTS_REQUEST = (state) => {
  state.loading = true;
}

export const GET_PRODUCTS_SUCCESS = (state, products) => {
  state.products = products;
  state.filteredProducts = products;
  state.loading = false;
}

export const GET_PRODUCTS_FAILURE = (state, err) => {
  state.loading = false;
  state.error = err;
}

export const GET_PRODUCT_REQUEST = (state) => {
  state.loading = true;
}

export const GET_PRODUCT_SUCCESS = (state, product) => {
  state.data = product;
  state.loading = false;
}

export const GET_PRODUCT_FAILURE = (state, err) => {
  state.loading = false;
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
  product.count = 1;
  product.sum = product.price;
  state.products.push(product);
  state.productCount += 1;
  state.sum = state.products.map(product => product.price).reduce((price, sum) => sum + price);
}

export const PRODUCT_COUNT_CHANGE_REQUEST = (state, payload) => {
  const product = state.products.find(item => item.id === payload.id);
  product.count += payload.value;
  product.sum = product.price * product.count;
  state.sum = state.products.map(product => product.sum).reduce((price, total) => total + price);
}

export const SET_FILTER_REQUEST = (state, payload) => {
  state.filter[payload.key] = payload.value;
}

export const FILTER_PRODUCTS_REQUEST = (state) => {
  state.loading = true;
}

export const FILTER_PRODUCTS_SUCCESS = (state) => {
  state.loading = false;
  state.filteredProducts = state.products.filter(product => {
    for(let key in state.filter) {
      if(product[key] !== state.filter[key]) {
        return null;
      }
    }

    return product;
  });

}

export const RESET_FILTER_REQUEST = (state) => {
  state.filter = {};
  state.filteredProducts = state.products;
}