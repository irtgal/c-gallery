<template>
  <div id="app">
    <div class="header-wrapper">
      <Header />
    </div>
    <div class="router-view-wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import Header from './components/Header.vue';


@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
@import './styles/main.scss';

.router-view-wrapper {
  padding: 50px 20px;
}
</style>