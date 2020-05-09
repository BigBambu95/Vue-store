<template>
  <div class="option">
    <span class="option__label">{{ this.getTranslate(label) }}</span>
    <span class="option__value">{{ value }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';

@Component({
  name: 'product-option',
})

export default class ProductOption extends Vue {
  @Prop({ default: '' }) label?: string;
  @Prop({ default: '' }) value?: string;
}
</script>

<style scoped>
.option {
  margin: .75em 0;
  font-size: var(--small);
}

.option__label {
  color: #999;
}

.option__label:after {
  content: ":";
}

.option__value {
  text-transform: capitalize;
}
</style>