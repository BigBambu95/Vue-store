<template>
  <div class="category">
    <router-view></router-view> 
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Category'
})

export default class Category extends Vue {}
</script>

<style scoped>


</style>