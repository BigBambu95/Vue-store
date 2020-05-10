<template>
  <div class="catalog">
    <h1>{{ this.$localization.getTranslate('catalog') }}</h1>
    <div class="categories">
      <catalog-item 
        v-for="category in this.$store.getters.categories" 
        :key="category._id" 
        :category="category"
      />
    </div> 
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { catalogMapper } from '../store/modules/catalog';
import CatalogItem from './catalog-item.vue';

const Mappers = Vue.extend({
  methods: {
    ...catalogMapper.mapActions({
      getCategories: 'GET_CATEGORIES',
    })
  }
});

@Component({
  name: 'Catalog',
  components: {
    CatalogItem
  }
})
export default class Catalog extends Mappers {
  
  created() {
    this.getCategories();
  }
}
</script>

<style scoped>
  .categories {
    display: flex;
  }

</style>