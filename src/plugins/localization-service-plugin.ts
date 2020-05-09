import { LocalizationService } from '../services';
import store from '../store';

const localizationServicePlugin = {
  install(Vue, options) {
    const localization = new LocalizationService(store.state.lang);

    Vue.mixin({
      methods: {
        getTranslate(key: string, status?: string): string {
          return localization.getTextWithStatus(key, status);
        }
      }
    });

    Vue.prototype.$localization = function() {
      return localization;
    }
  }
}

export default localizationServicePlugin;