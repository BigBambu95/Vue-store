import db from '../db.json';

export default class {

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

  getProduct(category, id) {
    const products = this.getItems(db.products[category]);

    return products.then(products => products.find(item => item.id == id));
  }
}