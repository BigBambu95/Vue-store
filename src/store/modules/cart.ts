import { Getters, Actions, Mutations, Module } from 'vuex-smart-module';

// Функция для подсчета итоговой цены товаров в корзине ----- Возможно вынести в другое место
const totalPrice = (items: Array<ProductTypes>) => {
  return items.map((product: ProductTypes) => product.price).reduce((price, total) => total + price);
}

interface StateTypes {
  products: Array<ProductTypes>;
  loading: boolean;
  error: object | null;
  productCount: number;
  sum: number;
}

interface ProductTypes {
  id: number;
  count: number;
  sum: number;
  price: number;
}

class CartState implements StateTypes {
  products = [];
  loading = false;
  error = null;
  productCount = 0;
  sum = 0;
}

class CartGetters extends Getters<CartState> {}


class CartMutations extends Mutations<CartState> {
  ADD_TO_CART_REQUEST = (product: ProductTypes) => {
    product.count = 1;
    product.sum = product.price;
    this.state.products.push(product);
    this.state.productCount += 1;

    // Итоговая цена товаров в корзине
    this.state.sum = totalPrice(this.state.products);
  }
  
  PRODUCT_COUNT_CHANGE_REQUEST = (payload: { id: number, value: number }) => {
    const product = this.state.products.find((product : ProductTypes): boolean => product.id === payload.id);
    product.count += payload.value;
    product.sum = product.price * product.count;
    
    // Итоговая цена товаров в корзине
    this.state.sum = totalPrice(this.state.products);
  }
}


class CartActions extends Actions<CartState, CartGetters, CartMutations, CartActions> {
  ADD_TO_CART = (product: ProductTypes) => {
    this.commit('ADD_TO_CART_REQUEST', product);
  }
  
  PRODUCT_COUNT_CHANGE = (payload: { id: number, value: number }) => {
    this.commit('PRODUCT_COUNT_CHANGE_REQUEST', payload);
  }
}


export default new Module({
  state: CartState,
  actions: CartActions,
  mutations: CartMutations,
  getters: CartGetters
});

