<template>
  <input :type="type" class="input" :placeholder="placeholder" />
</template>

<script>
export default {
  name: 'v-input',
  props: {
    type: {
      type: String,
      required: true,
      default: function() {
        return 'text';
      }
    },
    placeholder: String
  }
}
</script>


<style scoped>
.input {
  padding: .5em 1em;
  border: 1px solid #ededed;
  border-radius: 5px;
  cursor: pointer;
}

.input:focus {
  border-color: var(--main-color);
  box-shadow: inset 0 0 1px .25px var(--main-color);
}
</style>