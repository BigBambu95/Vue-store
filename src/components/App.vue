<template>
  <div class="vue-store">
    <Header />
    <main class="content">
      <div class="container">
        <breadcrumbs />
        <router-view></router-view>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';
import Header from './Header.vue';
import Footer from './Footer.vue';
import Breadcrumbs from './breadcrumbs.vue';

@Component({
  name: 'App',
  components: {
    Header,
    Footer,
    Breadcrumbs
  }
})

export default class App extends Vue {}
</script>

<style>

:root {
  --huge: 1.5rem;
  --large: 18px;
  --small: 13px;
  --main-color: #6c5ce7;
  --main-color-hover: #fdcb6e;
  --gray-color: #999;
  --dark-gray-color: #666;
  --bold-font: 700;
  --regular-font: 400;
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
  height: 100%;
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

.vue-store {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex-grow: 1;
}

.container {
  display: inherit;
  justify-content: inherit;
  align-items: inherit;
  max-width: 1440px;
  width: 100%;
  margin: auto;
}

.page-title {
  margin: 0;
}

@media screen and (max-width: 1480px) {
  .page-title {
    padding-left: .75em;
  }
}

</style>