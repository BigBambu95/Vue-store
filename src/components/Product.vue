<template>
  <div class="product">
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
        <div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';

import { productMapper } from '../store/modules/product';

const Mapper = Vue.extend({
  methods: {
    ...productMapper.mapActions({
      getProduct: 'GET_PRODUCT'
    }),
  }
})

@Component({
  name: 'Product'
})
export default class Product extends Mapper {

  mounted() {
    this.getProduct({
      category: this.$route.params.category,
      id: this.$route.params.id
    });
  }  
}

</script>

<style scoped>
.product {
  margin-top: 2em;
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
  padding: 2em;
}
</style>