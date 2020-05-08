import { Getters, Actions, Mutations, Module, createMapper } from 'vuex-smart-module';

import {VueStoreService} from '../../services';

const vueStoreService = new VueStoreService();

// Создаем строку запроса для фильтрации товаров
const createQuery = (obj?: FilterTypes): string => {
  let string = `?minPrice=${obj.minPrice || '0'}&maxPrice=${obj.maxPrice || 'Infinity'}&`;

  for(let key in obj) {
    if(obj[key] !== '' && key !== 'minPrice' && key !== 'maxPrice') {
      string += `${key}=${obj[key]}&`;
    }
  }

  return string;
}

interface FilterTypes {
  minPrice?: string;
  maxPrice?: string;
  brand?: string;
  os?: string;
  internalMemory?: string;
  coreCount?: number | string;
}

interface StateTypes {
  products: Array<ProductTypes>;
  filteredProducts: Array<ProductTypes>;
  categories: Array<object>;
  filter: FilterTypes;
  loading: boolean;
  error: object;
}

class CatalogState implements StateTypes {
  products: Array<ProductTypes> = [];
  filteredProducts: Array<ProductTypes> = [];
  categories: Array<object> = [];
  filter: FilterTypes = {
    minPrice: '',
    maxPrice: '',
    brand: '',
    os: '',
    internalMemory: '',
    coreCount: ''
  };
  loading: boolean = false;
  error: object = {};
}

class CatalogGetters extends Getters<CatalogState> {

  get products(): Array<object> {
    return this.state.filteredProducts;
  }

  get categories(): Array<object> {
    return this.state.categories;
  }

  get productsCount(): number {
    return this.state.filteredProducts.length;
  }

}

class CatalogMutations extends Mutations<CatalogState> {
  GET_PRODUCTS_REQUEST() {
    this.state.loading = true;
  }
  
  GET_PRODUCTS_SUCCESS(products: Array<ProductTypes>) {
    this.state.products = products;
    this.state.filteredProducts = products;
    this.state.loading = false;
  }
  
  GET_PRODUCTS_FAILURE(err: object) {
    this.state.loading = false;
    this.state.error = err;
  }
  
  GET_CATEGORIES_REQUEST() {
    this.state.loading = true;
  }
  
  GET_CATEGORIES_SUCCESS(categories: Array<object>) {
    this.state.categories = categories;
    this.state.loading = false;
  }
  
  GET_CATEGORIES_FAILURE(err: object) {
    this.state.error = err;
  }
  
  SET_FILTER_REQUEST(payload: { value: string, key: string }) {
    this.state.filter[payload.key] = payload.value;
  }
  
  RESET_FILTER_REQUEST() {
    let obj: {} = {};

    for(let key in this.state.filter) {
      obj[key] = '';
    }

    this.state.filter = obj;
    this.state.filteredProducts = this.state.products;
  }

}

class CatalogActions extends Actions<CatalogState, CatalogGetters, CatalogMutations, CatalogActions> {

  GET_PRODUCTS(category: string) {
    this.commit('GET_PRODUCTS_REQUEST');
    vueStoreService
      .getProducts(category, createQuery(this.state.filter))
      .then((products: Array<ProductTypes>) => {
        this.commit('GET_PRODUCTS_SUCCESS', products);
      })
      .catch((err: object) => {
        this.commit('GET_PRODUCTS_FAILURE', err);
      });
  }

  GET_CATEGORIES() {
    this.commit('GET_CATEGORIES_REQUEST');
    vueStoreService
      .getCategories()
      .then((categories: Array<object>) => {
        this.commit('GET_CATEGORIES_SUCCESS', categories);
      })
      .catch((err: object) => {
        this.commit('GET_CATEGORIES_FAILURE', err);
      });
  }

  
  SET_FILTER(payload: { value: string, key: string, category: string }) {
    this.commit('SET_FILTER_REQUEST', payload);
    this.commit('GET_PRODUCTS_REQUEST');
    vueStoreService
      .getProducts(payload.category, createQuery(this.state.filter))
      .then((products: Array<ProductTypes>) => {
        this.commit('GET_PRODUCTS_SUCCESS', products);
      })
      .catch((err: object) => {
        this.commit('GET_PRODUCTS_FAILURE', err);
      });
  }


  // TODO

  FILTER_PRODUCTS(category: string) {
    this.commit('GET_PRODUCTS_REQUEST');
    vueStoreService
      .getProducts(category, createQuery(this.state.filter))
      .then((products: Array<ProductTypes>) => {
        this.commit('GET_PRODUCTS_SUCCESS', products);
      })
      .catch((err: object) => {
        this.commit('GET_PRODUCTS_FAILURE', err);
      });
  }
  
  RESET_FILTER() {
    this.commit('RESET_FILTER_REQUEST');
  }
  
}


export const catalog = new Module({
  namespaced: false,
  state: CatalogState,
  actions: CatalogActions,
  mutations: CatalogMutations,
  getters: CatalogGetters
});

export const catalogMapper = createMapper(catalog);