import { Module } from 'vuex-smart-module';

import { catalog } from './catalog';
import { cart } from './cart';
import { product } from './product';

export const rootModule = new Module({
  modules: {
    cart,
    catalog,
    product
  }
});

