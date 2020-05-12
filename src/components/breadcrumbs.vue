<template>
  <div class="breadcrumbs" v-if="breadcrumbs.length > 0">
    <router-link 
      class="breadcrumbs__link active"
      v-for="(crumb, idx) in breadcrumbs" 
      :key="idx"
      :to="{ path: getPath(crumb) }"
      :tag="idx != $breadcrumbs.length - 1 ? 'a' : 'span'"
    >
      {{ $localization.getTranslate(getBcLinkText(crumb.meta.bcLinkText)) }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component({
  name: "breadcrumbs",
})
export default class Breadcrumbs extends Vue {

  //methods 
  getPath(crumb: { path: string }) {
    let { path } = crumb;

    for(let [key, value] of Object.entries(this.$route.params)) {
      path = path.replace(`:${key}`, value);
    }

    return path;
  }

  getBcLinkText(bc) {
    return typeof bc === 'function' ? bc.call(this, this.$route.params) : bc;
  }

  // Computed
  get breadcrumbs() {
    return this['$breadcrumbs'].filter(bc => bc.meta.isBreadcrumbs);
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
  font-size: var(--small);
  text-transform: capitalize;
  text-decoration: none;
}

span.breadcrumbs__link {
  color: var(--gray-color);
}

a.breadcrumbs__link {
  color: var(--dark-gray-color);
}

a.breadcrumbs__link:hover {
  color: #000;
}

.breadcrumbs__link:not(:last-child):after {
  content: "\203A";
  position: absolute;
  top: 0;
  right: -.75rem;
}
</style>