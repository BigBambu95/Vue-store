export default class VueStoreService {
  _url: string;

  constructor() {
    this._url = 'http://localhost:3000/api'; 
  }

  async getCategories() {
    try {
      const res = await fetch(`${this._url}/categories`);
      return res.json();
    } catch(err) {
      return err;
    }
  }

  async getProducts(category: string, query: string = '') {
    const res = await fetch(`${this._url}/products/${category}/${query}`);
    return res.json();
  }

  async getProduct(category: string, id: string) {
    try {
      const res = await fetch(`${this._url}/products/${category}/${id}`);
      return res.json();
    } catch(err) {
      return err;
    }
  }
}