<template>
  <header class="main-header">
    <div class="container">
      <span class="logo">Vue Store</span>
      <div class="nav-bar">
        <router-link class="link" to="/catalog">Каталог</router-link>
        <CartMini />
      </div>
    </div>
  </header>
</template>

<script>
import CartMini from './CartMini.vue';

export default {
  name: 'Header',
  components: {
    CartMini
  }
}
</script>

<style scoped>
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ededed;
  background: #fff;
}

.link {
  color: rgba(0, 0, 0, .7);
  text-decoration: none;
}

.link:hover {
  color: #000;
  text-decoration: underline;
}

.main-header .logo {
  font-size: var(--huge);
  font-weight: 700;
}

@media screen and (max-width: 1480px) {
  .main-header .logo  {
    padding-left: 1em;
  }
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-bar > * {
  margin-left: 1.5em;
}


</style>