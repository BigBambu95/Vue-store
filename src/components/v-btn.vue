<template>
  <button 
    class="btn" 
    :class="[type, size, { rounded, active }]" 
    :style="{ width }"
    @click="click"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';

@Component({
  name: 'Button'
})

export default class VBtn extends Vue {
  @Prop({ default: 'medium' }) size?: 'large' | 'medium' | 'small';
  @Prop({ default: 'contained'}) type?: 'contained' | 'outlined';
  @Prop({ default: undefined }) width?: string | number;
  @Prop({ default: false }) rounded?: boolean;
  @Prop({ default: false }) active?: boolean;

  // Methods
  click() {
    this.$emit('click');
  }

}
</script>

<style scoped>
.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  padding: 0 1em;
  border: none;
  border-radius: 5px;
  background: transparent;
  line-height: 1;
  cursor: pointer;
  user-select: none;
}

.btn.rounded {
  border-radius: 50%;
}

.btn.text {
  background: none;
}

.btn.outlined {
  border: 1px solid var(--main-color);
  color: var(--main-color);
}

.btn.contained {
  background: var(--main-color);
  color: #fff;
}

.btn.contained.active {
  background: var(--main-color-hover);
}

.btn.btn.contained:hover {
  background: var(--main-color-hover);
}

.btn.large {
  height: 48px;
  font-size: var(--huge);
}

</style>