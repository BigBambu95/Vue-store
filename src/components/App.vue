<template>
  <div>
    <h1>Hello World</h1>
    <button @click="fetchProducts">Загрузить</button>
    <div v-for="product in this.$store.state.products" :key="product.id">
      {{ product.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    fetchProducts() { 
      this.$store.dispatch('GET_PRODUCTS');
    }
  }
}
</script>

<style scoped>

</style>