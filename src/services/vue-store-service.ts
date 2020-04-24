import db from '../db.json';

export default class VueStoreService {

  getItems(data: Array<object> | object) {
    return new Promise((resolve, reject) => {
      try {
        resolve(data); 
      } catch(err) {
        reject(err);
      }
    });
  }

  getCategories() {
    return this.getItems(db.categories);
  }

  getProducts(category: string) {
    return this.getItems(db.products[category]);
  }

  getProduct(category: string, id: number) {
    const products = this.getItems(db.products[category]);

    return products.then((products) => products.find((item: { id: number }): boolean => item.id === id));
  }
}