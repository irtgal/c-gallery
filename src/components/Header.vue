<template>
  <header class="app-header"  @click="goHome()">
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

  // Methods
  goHome() {
    if (this.$route.name !== 'BreedList') {
      this.$router.push({ name: 'BreedList' });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.app-header {
  background-color: $secondaryColor;
  padding: 10px 0;
  text-align: center;
}

.app-header:hover {
  cursor: pointer;
}
</style>