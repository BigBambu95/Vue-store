<template>
  <div class="products">
    <Loader v-if="this.$store.state.catalog.loading" />
    <div 
      v-else    
      v-for="product in sortedProducts" 
      :key="product._id"
      class="product"
    >
      <router-link :to="{ name: 'product', params: { category: categoryUrl, product: product.url } }">
        <img class="product__picture" :src="product.picture" />
      </router-link>
      <div class="product__title">
        <router-link :to="{ name: 'product', params: { category: categoryUrl, product: product.url } }">{{ product.name }}</router-link>
      </div>
      <div class="product__footer">
        <div class="product__price">{{ getProductPrice(product) }} &#8381;</div>
        <v-btn 
          class="product__add-cart" 
          :class="{ active: getActiveBtn(product) }"
          @click="addToCartHandler(product)" 
          :disabled="getActiveBtn(product)"
        >
          <i class="fas fa-check" v-if="getActiveBtn(product)"></i>
          <i class="fas fa-shopping-cart" v-else></i>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import Loader from './Loader.vue';
import vBtn from './v-btn.vue';

import { cartMapper } from '../store/modules/cart';
import { catalogMapper } from '../store/modules/catalog';

const Mappers = Vue.extend({
  methods: {
    ...cartMapper.mapActions({
      addToCart: 'ADD_TO_CART'
    }),
    ...catalogMapper.mapActions({
      getProducts: 'GET_PRODUCTS',
    })
  }
})

@Component({
  name: 'product-list',
  components: {
    vBtn,
    Loader
  }
})

export default class ProductList extends Mappers {
  @Prop() sortValue: string;

  created() {
    this.getProducts(this.$route.params.category);
  }

  // Methods
  addToCartHandler(product: ProductTypes): void {
    this.addToCart(product);
  }

  getProductPrice(product: ProductTypes): string {
    return product.price.toLocaleString('ru');
  }

  getActiveBtn(product: ProductTypes): boolean {
    return this.$store.state.cart.products.find((item) => item._id === product._id) ? true : false;
  }

  // Computed
  get categoryUrl(): string {
    const category = this.$store.getters.categories.find((category: CategoryTypes): boolean => this.$route.path.includes(category.url));
    if(category) return category.url;
  }

  get sortedProducts() {
    switch(this.sortValue) {
      case '-price':
        return this.$store.getters.products.slice().sort((a: { price: number }, b: { price: number }) => a.price - b.price);
      
      case '+price': 
        return this.$store.getters.products.slice().sort((a: { price: number }, b: { price: number }) => b.price - a.price);

      case '-rating':
        return this.$store.getters.products.slice().sort((a: { rating: number }, b: { rating: number }) => a.rating - b.rating);

      case '+rating':
        return this.$store.getters.products.slice().sort((a: { rating: number }, b: { rating: number }) => b.rating - a.rating);

      default:
        return this.$store.getters.products;
    }
  }

}
</script>

<style scoped>
.products {
  grid-area: products;
  max-width: 1120px;
  display: flex;
  flex-flow: row wrap;
  border-top: 1px solid #ededed;
  border-left: 1px solid #ededed;
}

.product {
  width: 25%;
  height: 360px;
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 1em;
  padding-bottom: 2em;
  box-shadow: 0 0 0 1px #ededed;
  cursor: pointer;
  transition: .2s all;
}

@media screen and (max-width: 1380px) {
  .product {
    width: calc(100% / 3);
  }
}

@media screen and (max-width: 1130px) {
  .product {
    width: 50%;
  }
}

.product:hover {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .125);
}

.product__picture {
  object-fit: contain;
  width: 250px;
  height: 200px;
}

.product__title {
  width: 100%;
  padding: 1em 0;
  font-size: var(--large);
  font-weight: 700;
  text-align: center;
}

.product__title a {
  text-decoration: none;
  color: currentColor;
}

.product__footer {
  width: 75%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product__price {
  font-weight: 700;
}

.product__add-cart {
  padding: .5em 1em;
  border-radius: .5em;
  background: var(--main-color);
  color: #fff;
}

.product__add-cart:hover {
  background: var(--main-color-hover);
}

.product__add-cart.active {
  background: var(--main-color-hover);
}

</style>