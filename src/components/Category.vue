<template>
  <div class="category">
    <div class="category__header">
      <h1 class="page-title">{{ getCategoryName() }}</h1>
      <div>{{ this.productsCount() }} товара</div>
    </div>
    <div class="category__body">
      <aside class="sidebar filter-list">
        <ExpansionPanel title="Цена руб.">
          <div class="filter price">
            <v-input type="text" :placeholder="minPrice.toString()" />
            <v-input type="text" :placeholder="maxPrice.toString()" />
          </div> 
        </ExpansionPanel>
        <ExpansionPanel v-for="(filter, key) in this.$store.state.catalog.filter" :title="filter.label" :key="key">
          <div class="filter">
            <v-chip 
              v-for="(count, label) in getFilterFields(key)" 
              :key="label" 
              :label="label" 
              :active="filter.value === label"
              type="clickable"
              :rightContent="count"
              @click="setFilterHandler(key, label)" 
            />
          </div> 
        </ExpansionPanel>
        <div class="filter-list__footer">
          <v-btn type="contained" @click="filterProductsHandler">Показать</v-btn>
          <v-btn type="outlined" @click="resetFilter">Сбросить фильтр</v-btn>
        </div>
      </aside>
      <div class="listing-controls">
        <v-btn @click="setSortValue('-price', '+price')" type="text" class="sort-btn">
          <span>По цене</span>
          <span v-if="sortValue.includes('price')" class="sort-btn__arrow" :class="{ down: sortValue === '+price' }">
            <icon-base iconName="arrow" width="9" height="6">
              <icon-arrow />  
            </icon-base>
          </span>
        </v-btn>
        <v-btn @click="setSortValue('-rating', '+rating')" type="text" class="sort-btn">
          <span>По рейтингу</span>
          <span v-if="sortValue.includes('rating')" class="sort-btn__arrow" :class="{ down: sortValue === '+rating' }">
            <icon-base iconName="arrow" width="9" height="6">
              <icon-arrow />  
            </icon-base>
          </span>
        </v-btn>
      </div>
      <div class="products">
        <Loader v-if="this.$store.state.catalog.loading" />
        <div 
          v-else    
          v-for="product in sortedProducts" 
          :key="product._id"
          class="product"
        >
          <router-link :to="{ name: 'product', params: { category: getCategoryUrl(), id: product._id  } }">
            <img class="product__picture" :src="product.picture" />
          </router-link>
          <div class="product__title">
            <router-link :to="{ name: 'product', params: { category: getCategoryUrl(), id: product._id  } }">{{ product.name }}</router-link>
          </div>
          <div class="product__footer">
            <div class="product__price">{{ getProductPrice(product) }} &#8381;</div>
            <v-btn class="product__add-cart" :class="{ active: getActiveBtn(product) }" @click="addToCartHandler(product)" :disabled="getActiveBtn(product)">
              <i class="fas fa-check" v-if="getActiveBtn(product)"></i>
              <i class="fas fa-shopping-cart" v-else></i>
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';

import Loader from './Loader.vue';
import ExpansionPanel from './ExpansionPanel.vue';
import vBtn from './v-btn.vue';
import vInput from './v-input.vue';
import vChip from './v-chip.vue';
import IconBase from './icons/IconBase.vue';
import IconArrow from './icons/IconArrow.vue';

import { cartMapper } from '../store/modules/cart';
import { catalogMapper } from '../store/modules/catalog';


const Mappers = Vue.extend({
  methods: {
    ...cartMapper.mapActions({
      addToCart: 'ADD_TO_CART'
    }),
    ...catalogMapper.mapActions({
      getCategories: 'GET_CATEGORIES',
      getProducts: 'GET_PRODUCTS',
      setFilter: 'SET_FILTER',
      filterProducts: 'FILTER_PRODUCTS',
      resetFilter: 'RESET_FILTER'
    }),
    ...catalogMapper.mapGetters(['productsCount'])
  }
});

@Component({
  name: 'Catalog',
  components: {
    Loader,
    ExpansionPanel,
    vBtn,
    vInput,
    vChip,
    IconBase,
    IconArrow
  }
})
export default class Category extends Mappers {
  // Data
  sortValue: string = '';

  // Methods
  addToCartHandler(product: ProductTypes): void {
    this.addToCart(product);
  }

  getCategoryName(): string {
    const category = this.$store.getters.categories.find((category: CategoryTypes): boolean => this.$route.path.includes(category.url));
    return category.name;
  }

  getCategoryUrl(): string {
    const category = this.$store.getters.categories.find((category: CategoryTypes): boolean => this.$route.path.includes(category.url));
    return category.url;
  }

  getFilterFields(value: string) {
    const obj: any = {};

    this.$store.getters.products.map((product: any) => {
      obj[product.options[value]] = obj[product.options[value]] ? obj[product.options[value]] + 1 : 1;
    });

    return obj;
  }

  setFilterHandler(key: string, value: string) {
    this.setFilter({
      key,
      value,
      category: this.$route.params.category
    });
  }

  filterProductsHandler(): void {
    this.filterProducts(this.$route.params.category);
  }

  resetFilterHandler(): void {
    this.resetFilter();
  }

  setSortValue(ascendingValue: string, descendingValue: string): void {
    this.sortValue = this.sortValue === ascendingValue ? descendingValue : ascendingValue;
  }

  getProductPrice(product: ProductTypes): string {
    return product.price.toLocaleString('ru');
  }

  getActiveBtn(product: ProductTypes): boolean {
    return this.$store.state.cart.products.find((item) => item._id === product._id) ? true : false;
  }

  // Computed
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

  get productsPrice() {
    return this.$store.getters.products.map((product: ProductTypes) => product.price);
  }

  get minPrice() {
    return Math.min.apply(null, this.productsPrice);
  }

  get maxPrice() {
    return Math.max.apply(null, this.productsPrice);
  }


  mounted() {
    this.getCategories();
    this.getProducts(this.$route.params.category);
  }
}
</script>

<style scoped>
:root {
  --filterBlockWidth: 325px;
  --productsBlockWidth: 1115px;
}

.category__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category__body {
  display: grid;
  grid-template-areas: 'sidebar listingControls'
                        'sidebar products';
  grid-template-columns: 325px 1fr;
  grid-template-rows: 85px;
  background: #fff;
}

.sidebar {
  grid-area: sidebar;
  max-width: var(--filterBlockWidth);
  width: 100%;
}

.listing-controls {
  grid-area: listingControls;
  max-height: 85px;
  padding: 1.5em;
  border-left: 1px solid #ededed;
}

.filter {
  display: flex;
  flex-flow: row wrap;
  padding: 1em;
}

.filter.price {
  flex-flow: row nowrap;
}

.filter .chip {
  margin-bottom: 15px;
}

.filter input {
  width: 100%;
  margin-left: 10px;
}

.filter-list__footer {
  display: flex;
  justify-content: space-between;
  padding: 1em;
  text-align: center;
}

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

.sort-btn {
  font-size: 15px;
}

.sort-btn__arrow {
  display: flex;
  margin-left: 10px;
  transition: .2s all;
}

.sort-btn__arrow.down {
  transform: rotate(180deg);
}
</style>