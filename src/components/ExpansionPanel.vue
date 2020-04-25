<template>
  <div class="exp-panel" :class="{ active: isActive }">
    <div class="exp-panel__title" @click="toggle">
      <span class="exp-panel__arrow">
        <icon-base iconName="arrow" width="10" height="10"><icon-arrow /></icon-base>
      </span>
      <span>{{ title }}</span>
    </div>
    <div class="exp-panel__content" :style="{ height: isActive ? contentHeight + 'px' : 0 }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import IconBase from './icons/IconBase.vue';
import IconArrow from './icons/IconArrow.vue';
import { Component, Prop, Vue } from 'Vue-property-decorator';

@Component({
  name: 'ExpansionPanel',
  components: {
    IconBase,
    IconArrow
  }
})
export default class ExpansionPanel extends Vue {
  // Props
  @Prop({ default: 'Заголовок' }) title: string | undefined;
   
  // Data
  isActive: boolean = true;
  contentHeight: number = 0;

  // Methods
  toggle() {
    this.isActive = !this.isActive;
  }

  mounted() {
    const node: any = this.$slots.default[0].elm;
    this.contentHeight = node['clientHeight'];
  }
}
</script>

<style scoped>
  .exp-panel {
    border-bottom: 1px solid #ededed;
  }

  .exp-panel.active .exp-panel__arrow {
    transform: rotate(0);
  }

  .exp-panel__title {
    padding: 1em 1.5em;
    font-size: var(--large);
    cursor: pointer;
    user-select: none;
  }

  .exp-panel__arrow {
    transform: rotate(180deg);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding: 7.5px;
    border: 1px solid #ededed;
    border-radius: 50%;
    transition: .2s all;
  }

  .exp-panel__content {
    height: 0;
    padding-bottom: .5em;
    overflow: hidden;
    transition: .2s all;
  }

  .exp-panel__content.active {
    height: auto;
  }

</style>