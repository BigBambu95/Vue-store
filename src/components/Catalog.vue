<template>
  <div>
    <h1>Каталог</h1>
    <Loader v-if="this.$store.state.loading" />
    <div v-else class="products">
      <div    
        v-for="product in this.$store.getters.products" 
        :key="product.id"
        class="product"
      >
        {{ product.name }}
        <img :src="product.picture" />
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
  mounted() {
    this.$store.dispatch('GET_PRODUCTS');
  }
}
</script>

<style scoped>
.products {
  display: flex;
}

.product {
  display: inline-flex;
  padding: 1em;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, .3);
}
</style>