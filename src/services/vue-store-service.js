import db from '../db.json';

export default class {
  constructor() {

  }

  getItems(data) {
    return new Promise((resolve, reject) => {
      resolve(data); 
    });
  }

  getCategories() {
    return this.getItems(db.categories);
  }

  getCategory(category) {
    return this.getItems(db.products[category]);
  }
}