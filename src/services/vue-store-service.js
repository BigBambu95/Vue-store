import db from '../db.json';

export default class {
  constructor() {

  }

  getProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(db.products);
      }, 1500);
    });
  }
}