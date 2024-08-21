<template>
  <div class="breed-card">
    <img :src="image" alt="Breed" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class BreedCard extends Vue {
  @Prop({ required: true }) image!: string;
}
</script>

<style scoped lang="scss">
.breed-card {
  width: 200px;
  height: 200px;
  margin: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>