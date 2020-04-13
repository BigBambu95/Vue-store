<template>
  <div class="category">
    <h1>{{ getTitle(this.$store.getters.categories) }}</h1>
    <Loader v-if="this.$store.state.catalog.loading" />
    <div v-else class="category__body">
      <aside class="sidebar">
        <ExpansionPanel title="Цена руб.">
          <div class="filter">
            <input :placeholder="minPrice" />
            <input :placeholder="maxPrice" />
          </div> 
        </ExpansionPanel>
      </aside>
      <div class="listing-controls">
        <span @click="sortValue = 'price'">По цене</span>
        <button @click="sortValue = ''">Сбросить сортировку</button>
      </div>
      <div class="products">
        <div    
          v-for="product in sortedProducts" 
          :key="product.id"
          class="product"
        >
          <img class="product__picture" :src="product.picture" />
          <div class="product__title">{{ product.name }}</div>
          <div class="product__footer">
            <div class="product__price">{{ product.price.toLocaleString('ru') }} &#8381;</div>
            <button class="product__add-cart btn" @click="addToCart(product)">
              <i class="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from './Loader.vue';
import ExpansionPanel from './ExpansionPanel.vue';

export default {
  name: 'Catalog',
  components: {
    Loader,
    ExpansionPanel
  },
  data: () => ({
    sortValue: ''
  }),
  methods: {
    addToCart(id) {
      this.$store.dispatch('ADD_TO_CART', id);
    },
    getTitle(state) {
      const item = state.find(item => this.$route.path.includes(item.url));
      return item.name;
    }
  },
  computed: {
    sortedProducts() {
      switch(this.sortValue) {
        case 'price': 
          return this.$store.getters.products.slice().sort((a, b) => b.price - a.price);

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
.category__body {
  display: grid;
  grid-template-areas: 'sidebar listingControls'
                        'sidebar products';
  background: #fff;
}

.sidebar {
  grid-area: sidebar;
  max-width: calc(1440px - 1180px);
  width: 100%;
}

.listing-controls {
  grid-area: listingControls;
  padding: 1.5em 2em;
}

.filter {
  display: flex;
  padding: 1em;
  border-bottom: 1px solid #ededed;
}

.filter input {
  width: 45%;
  margin-left: 1em;
}

.products {
  grid-area: products;
  max-width: 1180px;
  display: flex;
  flex-flow: row wrap;
}

.product {
  max-width: calc(1180px / 4);
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 1em;
  padding-bottom: 2em;
  box-shadow: 0 0 0 1px #ededed;
  cursor: pointer;
  transition: .2s all;
}

.product:hover {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .125);
}

.product__picture {
  object-fit: contain;
  width: 100%;
  height: 200px;
}

.product__title {
  width: 100%;
  padding: 1em 0;
  font-size: var(--large);
  font-weight: 700;
  text-align: center;
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
</style>