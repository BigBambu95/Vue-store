import localization from '../localization.json';

export default class LocalizationService {

  getText(lang: string, key: string): string {
    if(localization[lang][key] === undefined) return key;

    if(typeof(localization[lang][key]) === 'object') {
      return localization[lang][key]['default'];
    } else {
      return localization[lang][key];
    }
  }

  getTextWithStatus(lang: string, key: string, status?: string): string {
    return localization[lang][key][status];
  }

  getTextWithCount(lang: string, key: string, count?: number) {
    if(count === 1) {
      return localization[lang][key]['one'];
    } else if(count >= 2 && count <= 4) {
      return localization[lang][key]['several'];
    } else {
      return localization[lang][key]['group'];
    }
  }
}