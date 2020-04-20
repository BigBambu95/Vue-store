import { Mutations } from 'vuex-smart-module';



export const GET_PRODUCTS_REQUEST = (state) => {
  state.loading = true;
}

export const GET_PRODUCTS_SUCCESS = (state, products: Array<object>) => {
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

export const GET_PRODUCT_SUCCESS = (state, product: object) => {
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

export const GET_CATEGORIES_SUCCESS = (state, categories: Array<object>) => {
  state.categories = categories;
  state.loading = false;
}

export const GET_CATEGORIES_FAILURE = (state, err) => {
  state.error = err;
}



export const SET_FILTER_REQUEST = (state, payload: object) => {
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