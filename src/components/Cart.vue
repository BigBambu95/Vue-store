<template>
  <div v-if="this.$store.state.cart.products < 1">
    На данный момент ваша корзина пуста
  </div>
  <div v-else class="cart">
    <div class="product" v-for="product in this.$store.state.cart.products" :key="product.id">
      <img :src="product.picture" />
      <div>{{ product.name }}</div>
      <div class="product__price">{{ product.price }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart'  
}
</script>

<style scoped>
.cart {
  background: #fff;
}

.product {
  padding: 1em;
}
</style>