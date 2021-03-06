<template>
  <Loader v-if="this.$store.state.loading" />
  <div class="product" v-else>
    <header class="product__header">
      <h1 class="product__title">
        {{ this.$store.state.product.data.name }}
      </h1>
    </header>
    <div class="product__body">
      <div class="product__picture">
        <img :src="this.$store.getters.detailPicture" />
      </div>
      <div class="product__options">
        <product-option 
          v-for="(option, key) in this.$store.state.product.data.options" 
          :key="key"
          :label="key"
          :value="option"
        />
      </div>
      <div class="product__right-container">
        <div class="product__buy-product-block">
          <div class="product__price">
            {{ this.$store.getters.price }} &#8381;
          </div>
          <v-btn 
            :class="{ active: isActiveBtn() }" 
            size="large" width="100%" 
            @click="addToCartHandler" 
            :disabled="isActiveBtn()"
          >
            {{ this.$localization.getTranslateWithStatus('addToCartBtn', isActiveBtn() ? 'active' : 'default') }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';
import vBtn from './v-btn.vue';
import Loader from './Loader.vue';
import ProductOption from './product-option.vue';
import { productMapper } from '../store/modules/product';
import { cartMapper } from '../store/modules/cart';


const Mapper = Vue.extend({
  methods: {
    ...productMapper.mapActions({
      getProduct: 'GET_PRODUCT'
    }),
    ...cartMapper.mapActions({
      addToCart: 'ADD_TO_CART'
    })
  }
})

@Component({
  name: 'Product',
  components: {
    vBtn,
    Loader,
    ProductOption
  }
})
export default class Product extends Mapper {

  mounted() {
    this.$nextTick()
      .then(() => {
        this.getProduct({
            category: this.$route.params.category,
            product: this.$route.params.product
        });
      })
      .catch(err => console.error(err));
  }  

  // Methods
  addToCartHandler(): void {
    this.addToCart(this.$store.state.product.data);
  }

  isActiveBtn(): boolean {
    const { product, cart } = this.$store.state;
    return cart.products.some(item => item._id === product.data._id) ? true : false;
  }


}

</script>

<style scoped>
.product {
  background: #fff;
}

.product__header {
  padding: 1.5em 2em;
  border-bottom: 1px solid #ededed;
}

.product__title {
  margin: 0;
}

.product__body {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 2em;
}

.product__picture {
  margin: 0 2em;
}

.product__buy-product-block {
  padding: 1em 1.5em;
  box-shadow: 0 0 10px rgba(0, 0, 0, .12);
}

.product__price {
  font-size: var(--huge);
  font-weight: var(--bold-font);
}

.product__right-container {
  flex-basis: 25%;
}

.product__buy-product-block > * {
  margin: .5em 0;
}

</style>