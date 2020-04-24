export default class VueStoreService {

  constructor() {
    this._url = 'http://localhost:3000/api'; 
  }

  async getCategories() {
    const categories = await fetch(`${this._url}/categories`)
    return categories.json();
  }

  async getProducts(category) {
    const products = await fetch(`${this._url}/products/${category}`);
    return products.json();
  }

  async getProduct(category, id) {
    const product = await fetch(`${this._url}/products/${category}/${id}`);
    return product.json();
  }
}