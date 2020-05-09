import { Module, Mutations, Actions, Getters, createMapper } from 'vuex-smart-module';

import { catalog } from './catalog';
import { cart } from './cart';
import { product } from './product';

import { LocalizationService } from '../../services';

const localization = new LocalizationService();

interface StateTypes {
  lang: string;
}

class RootState implements StateTypes {
  lang = 'ru';
}
class RootMutations extends Mutations<RootState> {
  CHANGE_LANGUAGE_REQUEST() {
    this.state.lang === 'ru' ? localization.setLanguage('en'): localization.setLanguage('ru');
    this.state.lang = this.state.lang === 'ru' ? 'en': 'ru';
  }
}
class RootGetters extends Getters<RootState> {}
class RootActions extends Actions<RootState, RootGetters, RootMutations, RootActions> {
  CHANGE_LANGUAGE() {
    this.commit('CHANGE_LANGUAGE_REQUEST');
  }
}

export const rootModule = new Module({
  namespaced: false,
  state: RootState,
  mutations: RootMutations,
  actions: RootActions,
  getters: RootGetters,
  modules: {
    cart,
    catalog,
    product
  }
});

export const rootMapper = createMapper(rootModule);