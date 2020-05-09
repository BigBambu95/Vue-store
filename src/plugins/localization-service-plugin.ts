import { LocalizationService } from '../services';
import store from '../store';

const localizationServicePlugin = {
  install(Vue, options) {
    const localization = new LocalizationService();

    Vue.mixin({
      methods: {
        getTranslate(key: string): string {
          return localization.getText(store.state.lang, key);
        },
        getTranslateWithStatus(key: string, status?: string): string {
          return localization.getTextWithStatus(store.state.lang, key, status);
        },
        getTranslateWithCount(key: string, count: number): string {
          return localization.getText(store.state.lang, key, count);
        }
      }
    });

    Vue.prototype.$localization = function() {
      return localization;
    }
  }
}

export default localizationServicePlugin;