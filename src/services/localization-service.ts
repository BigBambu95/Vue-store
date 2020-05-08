import localization from '../localization.json';

export default class LocalizationService {

  getText(key: string, count?: number): string {
    if(!count) return localization[key];

    if(count === 1) {
      return localization[key]['one'];
    } else if(count >= 2 && count <= 4) {
      return localization[key]['several'];
    } else {
      return localization[key]['group'];
    }
  }

  getTextWithStatus(key: string, status?: string): string {
    return localization[key][status];
  }



}