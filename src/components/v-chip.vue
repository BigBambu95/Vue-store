<template>
  <span class="chip">{{ label }}</span>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    label: {
      type: String,
      required: true
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
</style>