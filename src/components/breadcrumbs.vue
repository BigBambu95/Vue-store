<template>
  <div class="breadcrumbs">
    <router-link 
      v-for="link in links" 
      :key="link"
      :to="{ name: link, params: { category: link } }"
      class="breadcrumbs__link active"
    >
      {{ $localization.getTranslate(link) }}
    </router-link >
    <span class="breadcrumbs__link">{{ $localization.getTranslate(currentPageTitle) }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component({
  name: "breadcrumbs",
  methods: {

  }
})
export default class Breadcrumbs extends Vue {

  get links() {
    return this.$route.path.split('/').slice(1, -1);
  }

  get currentPageTitle() {
    return this.$route.path.split('/').slice(-1);
  }

}
</script>

<style scoped>
.breadcrumbs {
  padding: 1em 0;
}

.breadcrumbs__link {
  position: relative;
  margin-right: 1.5rem;
  color: var(--gray-color);
  font-size: var(--small);
  text-transform: capitalize;
  text-decoration: none;
}

.breadcrumbs__link.active {
  color: var(--dark-gray-color);
}

.breadcrumbs__link.active:hover {
  color: #000;
}

.breadcrumbs__link:not(:last-child):after {
  content: "\203A";
  position: absolute;
  top: 0;
  right: -.75rem;
}
</style>