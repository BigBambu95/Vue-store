<template functional>
  <router-link class="cart" to="/cart">
    <div class="cart__icon">
      <i class="fas fa-shopping-cart"></i>
      <span v-if="hasProducts" class="cart__count">
        {{ this.$store.state.cart.productCount }}
      </span>
    </div>
    <div v-if="!hasProducts" class="cart__no-items">
      В корзине <br> нет товаров
    </div>
    <div v-else class="cart__sum">
      <div>Сумма</div>
      <div>{{ this.$store.state.cart.sum }} &#8381;</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';

@Component({
  name: 'CartMini'
})

export default class CartMini extends Vue {
 
  // Computed
  get hasProducts() {
    return this.$store.state.cart.productCount > 0;
  }
 
}
</script>

<style scoped>
.cart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  padding: .75em 1em;
  text-decoration: none;
  background: var(--main-color);
  color: #fff;
}

.cart__icon {
  position: relative;
  color: var(--main-color-hover);
  font-size: var(--huge);
}

.cart__count {
  position: absolute;
  top: -5px;
  right: -15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  color: var(--main-color);
  font-size: var(--small);
}

.cart__no-items,
.cart__sum {
  margin-left: 30px;
  font-size: var(--small);
}

</style>