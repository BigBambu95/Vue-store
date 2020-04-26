<template>
  <button class="btn" :class="[type, size]" @click="click">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';

@Component({
  name: 'Button'
})

export default class VBtn extends Vue {
  @Prop({ default: 'medium' }) size: string | undefined;
  @Prop({ default: 'contained'}) type: string | undefined;

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
  cursor: pointer;
  user-select: none;
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
</style>