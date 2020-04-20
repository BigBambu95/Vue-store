<template>
  <span 
    class="chip" 
    :class="[type, { active: isActive }]" 
    @click="click">
      {{ label }} 
      <span class="right-content">{{ rightContent }}</span>
    </span>
</template>

<script lang="ts">
export default {
  name: 'Chip',
  data: () => ({
    isActive: false
  }),
  props: {
    label: {
      type: String | Number,
      required: true
    },
    type: String,
    rightContent: String | Number
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
  display: inline-flex;
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

.right-content {
  margin-left: .75em;
  color: #999;
}
</style>