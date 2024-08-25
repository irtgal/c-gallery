<template>
  <div id="app">
    <div class="header-wrapper">
      <Header />
    </div>
    <div class="loading-wrapper" v-if="loading">
      <div class="loading-spinner"></div>
    </div>
    <div class="error-wrapper" v-else-if="error">
      <div class="error-message">{{ error }}</div>
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

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
</style>