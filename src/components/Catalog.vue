<template>
  <div>
    <h1>Каталог</h1>
    <Loader v-if="this.$store.state.catalog.loading" />
    <div v-else class="products">
      <div    
        v-for="product in this.$store.getters.products" 
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
</template>

<script>
import Loader from './Loader.vue';

export default {
  name: 'Catalog',
  components: {
    Loader
  },
  props: {},
  methods: {
    addToCart(id) {
      this.$store.dispatch('ADD_TO_CART', id);
    }
  },
  mounted() {
    this.$store.dispatch('GET_PRODUCTS');
  }
}
</script>

<style scoped>
.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 1em;
  background: #fff;
}

.product {
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 1em;
  box-shadow: 0 0 0 1px #ededed;
  cursor: pointer;
  transition: .2s all;
}

.product:hover {
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, .125);
}

.product__picture {
  object-fit: contain;
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