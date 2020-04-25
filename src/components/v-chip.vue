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
import { Component, Prop, Vue } from 'Vue-property-decorator';

@Component({
  name: 'Chip'
})

export default class VChip extends Vue {
  // Props
  @Prop() label: String | Number | undefined;
  @Prop() type: String | undefined;
  @Prop() rightContent: String | Number | undefined;

  // Data
  isActive: boolean = false;

  // Methods
  click() {
    this.isActive = !this.isActive;
    this.$emit('click');
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