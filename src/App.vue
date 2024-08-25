<template>
  <div id="app">
    <div class="header-wrapper">
      <Header />
    </div>
    <div class="loading-wrapper" v-if="loading">
      <div class="loading-spinner"></div>
    </div>
    <div class="error-wrapper" v-else-if="error">
      <h5 class="error-message">{{ error }}</h5>
    </div>

    <div v-show="!loading && !error" class="router-view-wrapper">
      <router-view />
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

  // Computed
  get loading(): boolean {
    return this.$store.state.app.loading;
  }

  get error(): String | undefined {
    return this.$store.state.app.error;
  }
}
</script>

<style lang="scss">
@import './styles/main.scss';

.router-view-wrapper {
  padding: 50px 20px;
}
.loading-wrapper,
.error-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Ensures the div takes the full height of the viewport
  text-align: center;
}

</style>