<template>
  <div>
    <router-link to="/catalog">Каталог</router-link>
    <router-view></router-view>
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