import localization from '../localization.json';

export default class LocalizationService {
  lang: string;

  constructor(lang?: string) {
    this.lang = lang;
  }

  getText(key: string, count?: number): string {
    if(!count) return localization[this.lang][key];

    if(count === 1) {
      return localization[this.lang][key]['one'];
    } else if(count >= 2 && count <= 4) {
      return localization[this.lang][key]['several'];
    } else {
      return localization[this.lang][key]['group'];
    }
  }

  getTextWithStatus(key: string, status?: string): string {
    return localization[this.lang][key][status];
  }

  getLanguage() {
    return this.lang;
  }

  setLanguage(lang) {
    this.lang = lang;
  }

}