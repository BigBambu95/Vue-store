<template>
  <footer class="main-footer">
    <div class="container">
      <div class="lang">
        <div>{{ this.getTranslate('language') }}</div> 
        <div class="lang__value" @click="changeLanguage">
          {{ this.getTranslateWithStatus('lang', this.$store.state.lang) }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { Component, Prop, Vue } from 'Vue-property-decorator';

import { rootMapper } from '../store/modules';

const Mappers = Vue.extend({
  methods: {
    ...rootMapper.mapActions({
      changeLanguage: 'CHANGE_LANGUAGE'
    })
  }
})

@Component({
  name: 'Footer',
})

export default class Footer extends Mappers {}
</script>

<style scoped>
.main-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 40px;
  padding: 1.5em 2em;
  background: #fff;
}

.lang {
  text-align: right;
}

.lang__value {
  text-transform: lowercase;
  cursor: pointer;
  user-select: none;
}

.lang__value:hover {
  text-decoration: underline;
}
</style>