<template>
  <div class="categories">
    <router-link 
      class="category-link"
      v-for="category in this.$store.getters.categories"
      :key="category._id"
      :to="{ name: 'product-list', params: { category: category.url } }"
    >
      <div class="category-link__picture">
        <img :src="category.picture" />
      </div>
      <div class="category-link__title">
        {{ $localization.getTranslate(category.url) }}
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { catalogMapper } from '../store/modules/catalog';

const Mappers = Vue.extend({
  methods: {
    ...catalogMapper.mapActions({
      getCategories: 'GET_CATEGORIES',
    })
  }
});

@Component({
  name: 'catalog-item'
})

export default class CatalogItem extends Mappers {

  created() {
    this.getCategories();
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