<template>
  <aside class="sidebar filter-list">
    <ExpansionPanel title="price">
      <div class="filter price">
        <v-input type="text" :placeholder="minPrice.toString()" v-model.lazy="minPriceInput" />
        <v-input type="text" :placeholder="maxPrice.toString()" v-model.lazy="maxPriceInput" />
      </div> 
    </ExpansionPanel>
    <ExpansionPanel v-for="(filter, key) in filters" :title="key" :key="key">
      <div class="filter">
        <v-chip 
          v-for="(count, label) in getFilterFields(key)" 
          :key="label" 
          :label="label" 
          :active="filter === label"
          type="clickable"
          :rightContent="count"
          @click="setFilterHandler(key, label)" 
        />
      </div> 
    </ExpansionPanel>
    <div class="filter-list__footer">
      <v-btn type="contained" @click="filterProducts">{{ $localization.getTranslate('filterBtn') }}</v-btn>
      <v-btn type="outlined" @click="resetFilter">{{ $localization.getTranslate('filterResetBtn') }}</v-btn>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import ExpansionPanel from './ExpansionPanel.vue';
import vBtn from './v-btn.vue';
import vChip from './v-chip.vue';
import vInput from './v-input.vue';

import { catalogMapper } from '../store/modules/catalog';

const Mappers = Vue.extend({
  methods: {
    ...catalogMapper.mapActions({
      setFilter: 'SET_FILTER'
    })
  }
})

@Component({
  name: 'v-filter',
  components: {
    vBtn,
    vChip,
    vInput,
    ExpansionPanel
  }
})

export default class Filter extends Mappers {
  @Prop() filterProducts: void;
  @Prop() resetFilter: void;

  //data
  minPriceInput: string = '';
  maxPriceInput: string = '';


  // Methods
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

  // Computed
  get filters(): object {
    const { filter } = this.$store.state.catalog;
    const obj: {} = {};

    for(let key in filter) {
      if(key !== 'minPrice' && key !== 'maxPrice') {
        obj[key] = filter[key];
      }
    }

    return obj;
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

  @Watch('minPriceInput')
  onMinPriceInputChanged(val) {
    this.setFilter({
      key: 'minPrice',
      value: val,
      category: this.$route.params.category
    })
  }

  @Watch('maxPriceInput')
  onMaxPriceInputChanged(val) {
    this.setFilter({
      key: 'maxPrice',
      value: val,
      category: this.$route.params.category
    })
  }
}
</script>

<style scoped>
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

.filter-list__footer .btn {
  flex-grow: 1;
}

.filter-list__footer .btn:first-child {
  margin-right: 1em;
}
</style>