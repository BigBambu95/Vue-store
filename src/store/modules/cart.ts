import { Getters, Actions, Mutations, Module } from 'vuex-smart-module';

class CartState {
  products = [];
  loading = false;
  error = null;
  productCount = 0;
  sum = 0;
}


class CartGetters extends Getters<CartState> {

}


class CartMutations extends Mutations<CartState> {
  ADD_TO_CART_REQUEST = (product: { count: number, sum: number, price: number }) => {
    product.count = 1;
    product.sum = product.price;
    this.state.products.push(product);
    this.state.productCount += 1;
    this.state.sum = this.state.products.map((product: { price: number }) => product.price).reduce((price, sum) => sum + price);
  }
  
  PRODUCT_COUNT_CHANGE_REQUEST = (payload: { id: number, value: number }) => {
    const product = this.state.products.find((item: { id: number }) => item.id == payload.id);
    product.count += payload.value;
    product.sum = product.price * product.count;
    this.state.sum = this.state.products.map((product: { sum: number }) => product.sum).reduce((price, total) => total + price);
  }
}


class CartActions extends Actions<CartState, CartGetters, CartMutations, CartActions> {
  ADD_TO_CART = (product: object) => {
    this.commit('ADD_TO_CART_REQUEST', product);
  }
  
  PRODUCT_COUNT_CHANGE = (payload: object) => {
    this.commit('PRODUCT_COUNT_CHANGE_REQUEST', payload);
  }
}


export default new Module({
  state: CartState,
  actions: CartActions,
  mutations: CartMutations,
  getters: CartGetters
});

