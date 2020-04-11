<template>
  <div class="catalog">
    <h1>Каталог</h1>
    <div class="categories">
      <router-link 
        v-for="category in this.$store.getters.categories"
        :key="category.id"
        :to="{ name: 'category', params: { category: category.url, title: category.name } }"
        class="category-link"
      >
        <div class="category-link__picture">
          <img :src="category.picture" />
        </div>
        <div class="category-link__title">{{ category.name }}</div>
      </router-link>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'Catalog',
  mounted() {
    this.$store.dispatch('GET_CATEGORIES');
  }
}
</script>

<style scoped>
  .categories {
    display: flex;
  }

  .category-link {
    display: flex;
    flex-flow: column wrap;
    margin-left: 1.5em;
    margin-bottom: 1.5em;
    background: #fff;
    color: #000;
    font-size: var(--large);
    text-decoration: none;
    transition: .1s all;
  }

  .category-link:hover {
    box-shadow: 0 4px 10px -2px rgba(0, 0, 0, .125);
  }

  .category-link:first-child {
    margin-left: 0;
  }

  .category-link__title {
    display: flex;
    align-items: center;
    padding: 1.25em;
  }

  .category-link__picture {
    display: inline-flex;
  }

  .category-link__picture img {
    width: 100%;
  }
</style>