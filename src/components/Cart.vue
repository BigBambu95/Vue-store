<template>
  <div class="cart">
    <header class="cart__header">
      <h1>{{ this.$localization.getTranslate('cart') }}</h1>
      <v-btn @click="back" type="text">
        {{ this.$localization.getTranslate('backToShopping') }}
      </v-btn>
    </header>
    <div v-if="this.$store.state.cart.products < 1" class="cart__body cart--empty">
      {{ this.$localization.getTranslate('emptyCart') }}
    </div>
    <div v-else class="cart__body">
      <div class="product" v-for="product in this.$store.state.cart.products" :key="product._id">
        <div class="product__picture">
          <img :src="product.picture" />
        </div>
        <div class="product__title">{{ product.name }}</div>
        <div class="product__count">
          <v-btn class="minus" :rounded="true" type="outlined" @click="minus(product._id)" :disabled="product.count === 1">
            <i>&minus;</i>
          </v-btn>
          <output class="output">{{ product.count }}</output>
          <v-btn class="plus" :rounded="true" type="outlined" @click="plus(product._id)" :disabled="product.count === 9">
            <i>&plus;</i>
          </v-btn>
        </div>
        <div class="product__price">{{ product.sum.toLocaleString('ru') }} &#8381;</div>
      </div>
      <footer class="cart__footer">
        {{ this.$localization.getTranslate('total' )}} 
        {{ this.$store.getters.productCount.toString() }} 
        {{ this.$localization.getTranslateWithCount('product', this.$store.getters.productCount) }} 
        <span class="total">{{ this.$store.getters.total }} &#8381;</span>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';
import vBtn from './v-btn.vue';
import { cartMapper } from '../store/modules/cart';


const Mapper = Vue.extend({
  methods: {
    ...cartMapper.mapActions({
      productCountChange: 'PRODUCT_COUNT_CHANGE'
    })
  }
});

@Component({
  name: 'Cart',
  components: {
    vBtn
  }
})

export default class Cart extends Mapper {

  // Methods
  back() {
    this.$router.go(-1);
  }
  
  plus(id: number) {
    this.productCountChange({ id, value: 1 });
    this.$forceUpdate();
  }

  minus(id: number) {
    this.productCountChange({ id, value: -1 });
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

.btn.plus,
.btn.minus {
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid #ccc;
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