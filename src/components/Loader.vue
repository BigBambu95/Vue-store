<template functional>
  <div class="loader">
    <div class="ripple">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'Vue-property-decorator';

@Component({
  name: 'Loader'
})

export default class Loader extends Vue {}
</script>

<style scoped>
.loader {
  position: relative;
  width: 100%;
  height: 100%;
  display: inline-block;
  margin: auto;
  overflow: hidden;
}

.ripple {
  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
  width: 200px;
  height: 200px;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}

.ripple div {
  position: absolute;
  border-width: 6px;
  border-style: solid;
  opacity: 1;
  border-radius: 50%;
  animation: ripple 1s cubic-bezier(0,0.2,0.8,1) infinite;
}

.ripple div:nth-child(1) {
  border-color: #6c5ce7
}

.ripple div:nth-child(2) {
  border-color: #a29bfe;
  animation-delay: -0.5s;
}

@keyframes ripple {
  0% {
    top: 94px;
    left: 94px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 17px;
    left: 17px;
    width: 154px;
    height: 154px;
    opacity: 0;
  }
}
</style>