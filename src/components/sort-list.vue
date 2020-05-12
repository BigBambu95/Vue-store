<template>
  <div>
    <v-btn @click="setSortValue('-price', '+price')" type="text" class="sort-btn">
      <span>{{ this.$localization.getTranslateWithStatus('price', 'by') }}</span>
      <span v-if="sortValue.includes('price')" class="sort-btn__arrow" :class="{ down: sortValue === '+price' }">
        <icon-base iconName="arrow" width="9" height="6">
          <icon-arrow />  
        </icon-base>
      </span>
    </v-btn>
    <v-btn @click="setSortValue('-rating', '+rating')" type="text" class="sort-btn">
      <span>{{ this.$localization.getTranslateWithStatus('rating', 'by') }}</span>
      <span v-if="sortValue.includes('rating')" class="sort-btn__arrow" :class="{ down: sortValue === '+rating' }">
        <icon-base iconName="arrow" width="9" height="6">
          <icon-arrow />  
        </icon-base>
      </span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import IconBase from './icons/IconBase.vue';
import IconArrow from './icons/IconArrow.vue';
import VBtn from './v-btn.vue';

@Component({
  name: 'sort-list',
  components: {
    VBtn,
    IconBase,
    IconArrow
  }
})

export default class SortList extends Vue {
  @Prop() sortValue: string;
  @Prop() setSortValue: void;
}
</script>

<style scoped>
.sort-btn {
  font-size: 15px;
}

.sort-btn__arrow {
  display: flex;
  margin-left: 10px;
  transition: .2s all;
}

.sort-btn__arrow.down {
  transform: rotate(180deg);
}
</style>