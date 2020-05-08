<template>
  <input :type="type" class="input" :placeholder="placeholder" @change="$emit('change', $event.target.value)" :value="value" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';

@Component({
  name: 'Input',
  model: {
    prop: 'value',
    event: 'change'
  }
})

export default class VChip extends Vue {
  // Props
  @Prop() value: string | number;
  @Prop({ default: 'text' }) type: string | undefined;
  @Prop() placeholder: string | undefined;

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