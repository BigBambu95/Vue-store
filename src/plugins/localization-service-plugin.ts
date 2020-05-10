import { LocalizationService } from '../services';
import store from '../store';

const localizationServicePlugin = {
  install(Vue, options) {
    const localization = new LocalizationService();

    Vue.prototype.$localization = {
      getTranslate: function(key: string) {
        return localization.getText(store.state.lang, key);
      },
      getTranslateWithStatus: function(key: string, status?: string) {
        return localization.getTextWithStatus(store.state.lang, key, status);
      },
      getTranslateWithCount: function(key: string, count?: number) {
        return localization.getTextWithCount(store.state.lang, key, count);
      }
    }
  }
}

export default localizationServicePlugin;