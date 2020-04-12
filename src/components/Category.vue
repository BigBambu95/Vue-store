<template>
  <div class="category">
    <h1>{{ this.$route.params.title }}</h1>
    <Loader v-if="this.$store.state.catalog.loading" />
    <div v-else class="category__body">
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
            <div class="product__price">{{ product.price }} &#8381;</div>
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

export default {
  name: 'Catalog',
  components: {
    Loader
  },
  data: () => ({
    sortValue: ''
  }),
  methods: {
    addToCart(id) {
      this.$store.dispatch('ADD_TO_CART', id);
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
    }
  },
  mounted() {
    this.$store.dispatch('GET_PRODUCTS', this.$route.params.category);
  }
}
</script>

<style scoped>
.category__body {
  background: #fff;
}

.listing-controls {
  padding: 1.5em 2em;
}

.products {
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