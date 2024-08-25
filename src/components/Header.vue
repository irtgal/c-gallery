<template>
  <header class="app-header">
    <h1>{{title}}</h1>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class Header extends Vue {

// Computed
  get title(): string {
    return this.$store.state.app.title;
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  background-color: #42b983;
  color: white;
  padding: 10px 0;
  text-align: center;
}
</style>