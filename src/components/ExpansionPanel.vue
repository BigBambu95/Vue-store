<template>
  <div class="exp-panel">
    <div class="exp-panel__title" @click="toggle">{{ title }}</div>
    <div class="exp-panel__content" :style="{ height: isActive ? contentHeight + 'px' : 0 }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpansionPanel',
  props: {
    title: String
  },
  data: () => ({
    isActive: true,
    contentHeight: 0,
  }),
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    }
  },
  mounted() {
    this.contentHeight = this.$slots.default[0].elm.clientHeight;
  }
}
</script>

<style scoped>
  .exp-panel {
    border-bottom: 1px solid #ededed;
  }

  .exp-panel__title {
    padding: 1em 2em;
    font-size: var(--large);
    cursor: pointer;
    user-select: none;
  }

  .exp-panel__content {
    height: 0;
    overflow: hidden;
    transition: .2s all;
  }

  .exp-panel__content.active {
    height: auto;
  }

</style>