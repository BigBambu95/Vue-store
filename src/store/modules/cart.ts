import { Getters, Actions, Mutations, Module, createMapper } from 'vuex-smart-module';

// Функция для подсчета итоговой цены товаров в корзине ----- Возможно вынести в другое место
const totalPrice = (items: Array<ProductTypes>) => {
  const productsPrice = items.map((product: ProductTypes) => product.price);
  return productsPrice.reduce((price: number | undefined, total: number | undefined) => total + price);
}

interface StateTypes {
  products: Array<ProductTypes>;
  loading: boolean;
  error: object | null;
  productCount: number;
  total: number | undefined;
}

class CartState implements StateTypes {
  products: Array<ProductTypes> = [];
  loading = false;
  error = null;
  productCount: number = 0;
  total: number = 0;
}

class CartGetters extends Getters<CartState> {}


class CartMutations extends Mutations<CartState> {
  ADD_TO_CART_REQUEST(product: ProductTypes) {
    product.count = 1;
    product.sum = product.price;
    this.state.products.push(product);
    this.state.productCount += 1;

    // Итоговая цена товаров в корзине
    this.state.total = totalPrice(this.state.products);
  }
  
  PRODUCT_COUNT_CHANGE_REQUEST(payload: { id: number, value: number }) {
    const product: ProductTypes = this.state.products.find((product) => product._id === payload.id);
    product.count += payload.value;
    product.sum = product.price * product.count;
    
    // Итоговая цена товаров в корзине
    this.state.total = totalPrice(this.state.products);
  }
}


class CartActions extends Actions<CartState, CartGetters, CartMutations, CartActions> {
  ADD_TO_CART(product: ProductTypes) {
    this.commit('ADD_TO_CART_REQUEST', product);
  }
  
  PRODUCT_COUNT_CHANGE(payload: { id: number, value: number }) {
    this.commit('PRODUCT_COUNT_CHANGE_REQUEST', payload);
  }
}


export const cart = new Module({
  state: CartState,
  actions: CartActions,
  mutations: CartMutations,
  getters: CartGetters
});

export const cartMapper = createMapper(cart);