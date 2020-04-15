<template>
  <span class="chip" :class="[type, { active: isActive }]" @click="click">{{ label }}</span>
</template>

<script>
export default {
  name: 'Chip',
  data: () => ({
    isActive: false
  }),
  props: {
    label: {
      type: String,
      required: true
    },
    type: String
  },
  methods: {
    click() {
      this.isActive = !this.isActive;
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
.chip {
  margin-left: 10px;
  padding: .5em 1em;
  border-radius: 5px;
  background: #f7f7f7;
  font-size: var(--small);
}

.chip.clickable {
  user-select: none;
  cursor: pointer;
}

.chip.active {
  background: var(--main-color);
  color: #fff;
}
</style>