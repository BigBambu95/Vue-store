<template>
  <button class="btn" :class="type" @click="click">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      default: function() {
        return '';
      }
    },
    type: String,
  },
  methods: {
    click() {
      this.$emit('click');
    }
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