<template>
  <router-link class="cart" to="/cart">
    <div class="cart__icon">
      <i class="fas fa-shopping-cart"></i>
      <span class="cart__count"></span>
    </div>
    <div v-if="this.$store.state.cart.productCount < 1">
      В корзине нет товаров
    </div>
    <div v-else>
      Сумма {{ }}
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CartMini'  
}
</script>

<style scoped>
.cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
}

.cart__icon {
  position: relative;
  color: #000;
  font-size: var(--huge);
}

.cart__count {
  position: absolute;
  top: -5px;
  right: -15px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, .3);
}
</style>