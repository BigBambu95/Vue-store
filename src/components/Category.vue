<template>
  <div class="category">
    <div class="category__header">
      <h1 class="page-title">{{ $localization.getTranslate(getCategoryName()) }}</h1>
      <div>
        {{ this.productsCount() }} 
        {{ $localization.getTranslateWithCount('product', this.productsCount()) }}
      </div>
    </div>
    <div class="category__body">
      <v-filter 
        :filterProducts="filterProductsHandler" 
        :resetFilter="resetFilterHandler" 
      />
      <div class="listing-controls">
        <sort-list 
          :sortValue="sortValue" 
          :setSortValue="setSortValue" 
        />
      </div>
      <product-list :sortValue="sortValue" />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';

import SortList from './sort-list.vue';
import vFilter from './v-filter.vue';
import ProductList from './product-list.vue';

import { catalogMapper } from '../store/modules/catalog';

const Mappers = Vue.extend({
  methods: {
    ...catalogMapper.mapActions({
      getCategories: 'GET_CATEGORIES',
      setFilter: 'SET_FILTER',
      filterProducts: 'FILTER_PRODUCTS',
      resetFilter: 'RESET_FILTER'
    }),
    ...catalogMapper.mapGetters(['productsCount'])
  },
});

@Component({
  name: 'Catalog',
  components: {
    SortList,
    vFilter,
    ProductList
  }
})

export default class Category extends Mappers {

  // Data
  sortValue: string = '';

  // Methods
  filterProductsHandler(): void {
    this.filterProducts(this.$route.params.category);
  }

  resetFilterHandler(): void {
    this.resetFilter();
  }

  setSortValue(ascendingValue: string, descendingValue: string): void {
    this.sortValue = this.sortValue === ascendingValue ? descendingValue : ascendingValue;
  }

  getCategoryName(): string {
    const category = this.$store.getters.categories.find((category: CategoryTypes): boolean => this.$route.path.includes(category.url));
    if(category) return category.url;
  
  }

  created() {
    this.getCategories();
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
  margin-top: 1rem;
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
</style>