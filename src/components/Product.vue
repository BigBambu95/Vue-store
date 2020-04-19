<template>
  <div class="product">
    <header class="product__header">
      <h1 class="product__title">
        {{ this.$store.state.product.data.name }}
      </h1>
    </header>
    <div class="product__body">
      <div class="product__picture">
        <img :src="this.$store.state.product.data.detailPicture" />
      </div>
      <div class="product__options">
        <div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  mounted() {
    this.$store.dispatch('GET_PRODUCT', {
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