<template>
  <div class="category">
    <h1 class="page-title">{{ getCategoryName(this.$store.getters.categories) }}</h1>
    <div class="category__body">
      <aside class="sidebar filter-list">
        <ExpansionPanel title="Цена руб.">
          <div class="filter price">
            <v-input type="text" :placeholder="minPrice.toString()" />
            <v-input type="text" :placeholder="maxPrice.toString()" />
          </div> 
        </ExpansionPanel>
        <ExpansionPanel title="Производитель">
          <div class="filter">
            <v-chip 
              v-for="(count, brand) in getFilterFields('brand')" 
              :key="brand" 
              :label="brand" 
              type="clickable"
              :rightContent="count"
              @click="setFilter('brand', brand)" 
            />
          </div> 
        </ExpansionPanel>
        <ExpansionPanel title="Операционная система">
          <div class="filter">
            <v-chip 
              v-for="(count, os) in getFilterFields('os')" 
              :key="os" 
              :label="os" 
              type="clickable"
              :rightContent="count"
              @click="setFilter('os', os)" 
            />
          </div> 
        </ExpansionPanel>
        <div class="filter-list__footer">
          <v-btn type="contained" @click="filterProducts">Показать</v-btn>
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
          :key="product.id"
          class="product"
        >
          <router-link :to="{ name: 'product', params: { category: getCategoryUrl(), id: product.id  } }">
            <img class="product__picture" :src="product.picture" />
          </router-link>
          <div class="product__title">
            <router-link :to="{ name: 'product', params: { category: getCategoryUrl(), id: product.id  } }">{{ product.name }}</router-link>
          </div>
          <div class="product__footer">
            <div class="product__price">{{ product.price.toLocaleString('ru') }} &#8381;</div>
            <v-btn class="product__add-cart" @click="addToCart(product)">
              <i class="fas fa-shopping-cart"></i>
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

@Component
export default class Category extends Vue {
  name: 'Catalog',
  components: {
    Loader,
    ExpansionPanel,
    vBtn,
    vInput,
    vChip,
    IconBase,
    IconArrow
  },
  data: () => ({
    sortValue: ''
  }),
  methods: {
    addToCart(product) {
      this.$store.dispatch('ADD_TO_CART', product);
    },
    getCategoryName(state) {
      const item = state.find(item => this.$route.path.includes(item.url));
      return item.name;
    },
    getCategoryUrl() {
      const item = this.$store.getters.categories.find(item => this.$route.path.includes(item.url));
      return item.url;
    },
    getFilterFields(value) {
      const obj = {};

      this.$store.getters.products.map(product => {
        obj[product[value]] = obj[product[value]] ? obj[product[value]] + 1 : 1;
      });

      return obj;
    },
    setFilter(key, value) {
      this.$store.dispatch('SET_FILTER', { key, value });
    },
    filterProducts() {
      this.$store.dispatch('FILTER_PRODUCTS');
    },
    resetFilter() {
      this.$store.dispatch('RESET_FILTER');
    },
    setSortValue(ascendingValue, descendingValue) {
      this.sortValue = this.sortValue === ascendingValue ? descendingValue : ascendingValue;
    }
  },
  computed: {
    sortedProducts() {
      switch(this.sortValue) {
        case '-price':
          return this.$store.getters.products.slice().sort((a, b) => a.price - b.price);
        
        case '+price': 
          return this.$store.getters.products.slice().sort((a, b) => b.price - a.price);

        case '-rating':
          return this.$store.getters.products.slice().sort((a, b) => a.rating - b.rating);

        case '+rating':
          return this.$store.getters.products.slice().sort((a, b) => b.rating - a.rating);

        default:
          return this.$store.getters.products;
      }
    },
    minPrice() {
      return Math.min.apply(null, this.$store.getters.products.map(item => item.price));
    },
    maxPrice() {
      return Math.max.apply(null, this.$store.getters.products.map(item => item.price));
    }
  },
  mounted() {
    this.$store.dispatch('GET_CATEGORIES');
    this.$store.dispatch('GET_PRODUCTS', this.$route.params.category);
  }
}
</script>

<style scoped>
:root {
  --filterBlockWidth: 325px;
  --productsBlockWidth: 1115px;
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