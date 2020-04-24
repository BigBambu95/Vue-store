<template>
  <div class="cart">
    <header class="cart__header">
      <h1>Корзина</h1>
      <v-btn @click="back" type="text">Вернуться к покупкам</v-btn>
    </header>
    <div v-if="this.$store.state.cart.products < 1" class="cart__body cart--empty">
      На данный момент ваша корзина пуста
    </div>
    <div v-else class="cart__body">
      <div class="product" v-for="product in this.$store.state.cart.products" :key="product.id">
        <div class="product__picture">
          <img :src="product.picture" />
        </div>
        <div class="product__title">{{ product.name }}</div>
        <div class="product__count">
          <v-btn class="btn minus" @click="minus(product.id)" :disabled="product.count === 1">
            <i>&minus;</i>
          </v-btn>
          <output class="output">{{ product.count }}</output>
          <v-btn class="btn plus" @click="plus(product.id)" :disabled="product.count === 9">
            <i>&plus;</i>
          </v-btn>
        </div>
        <div class="product__price">{{ product.sum.toLocaleString('ru') }} &#8381;</div>
      </div>
      <footer class="cart__footer">
        Итого {{ this.$store.state.cart.productCount }} товар <span class="total">{{ this.$store.state.cart.sum.toLocaleString('ru') }} &#8381;</span>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';
import vBtn from './v-btn.vue';

@Component({
  name: 'Cart',
  components: {
    vBtn
  }
})

export default class Cart extends Vue {

  // Methods
  back() {
    this.$router.go(-1);
  }
  
  plus(id: number) {
    this.$store.dispatch('PRODUCT_COUNT_CHANGE', { id, value: 1 });
    this.$forceUpdate();
  }

  minus(id: number) {
    this.$store.dispatch('PRODUCT_COUNT_CHANGE', { id, value: -1 });
    this.$forceUpdate();
  }
  
}
</script>

<style scoped>
.cart {
  max-width: 1024px;
  margin: auto;
}

.cart__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.cart__body {
  background: #fff;
}

.cart--empty {
  padding: 1em;
}

.product {
  display: grid;
  grid-template-columns: 150px 1fr 1fr 1fr;
  padding: 1em;
  border-bottom: 1px solid #ccc;
}

.product__picture {
  height: 120px;
  text-align: center;
}

.product__picture img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}


.product__count,
.product__title {
  padding: 15px;
}

.product__count {
  text-align: center;
}

.plus,
.minus {
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: transparent;
  color: #ccc;
  font-size: var(--large);
  font-style: normal;
  font-weight: 700;
}

.plus i,
.minus i {
  font-style: inherit;
}

.product__count .output {
  margin: 0 10px;
  padding: .5em 1em;
  border: 1px solid #ccc;
  border-radius: .5em;
}

.product__price {
  padding: 15px 0;
  font-size: var(--large);
  font-weight: 700;
  text-align: right;
}

.cart__footer {
  padding: 1.5em 1em;
  text-align: right;
}

.total {
  margin-left: 25px;
  font-size: var(--large);
  font-weight: 700;
}
</style>