export default class VueStoreService {
  _url: string;

  constructor() {
    this._url = 'http://localhost:3000/api'; 
  }

  async getCategories() {
    const categories = await fetch(`${this._url}/categories`)
    return categories;
  }

  async getProducts(category: string) {
    const products = await fetch(`${this._url}/products/${category}`);
    return products;
  }

  async getProduct(category: string, id: number) {
    const product = await fetch(`${this._url}/products/${category}/${id}`);
    return product;
  }
}