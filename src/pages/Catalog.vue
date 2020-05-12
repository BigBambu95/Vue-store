<template>
  <div class="catalog">
    <router-view></router-view> 
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Catalog'
})

export default class Catalog extends Vue {}
</script>

<style scoped>


</style>