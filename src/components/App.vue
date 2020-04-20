<template>
  <div class="vue-store">
    <Header />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';


@Component
export default class App extends Vue {


  fetchProducts() { 
    this.$store.dispatch('GET_PRODUCTS');
  }

}
</script>

<style>

:root {
  --huge: 1.5rem;
  --large: 18px;
  --small: 13px;
  --main-color: #6c5ce7;
  --main-color-hover: #fdcb6e;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.5;
  background: #f5f5f5;
}

button,
input {
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
}

.container {
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  max-width: 1440px;
  width: 100%;
  margin: auto;
}

@media screen and (max-width: 1480px) {
  .page-title {
    padding-left: .75em;
  }
}

</style>