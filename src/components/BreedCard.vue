<template>
  <div
      class="breed-card"
      :style="backgroundStyle"
      @click="$emit('selected', breed)"
  >
    <div class="breed-name">{{ breed.name }}</div>
    <div v-if="breed.images" class="image-count">{{ imageCount }} images</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Breed } from "@/types";

@Component
export default class BreedCard extends Vue {
  @Prop({ required: true }) breed!: Breed;


  // Computed
  get breedImage(): string | null {
    return this.breed.images && this.breed.images.length > 0 ? this.breed.images[0] : null;
  }

  get imageCount(): number {
    return this.breed.images ? this.breed.images.length : 0;
  }

  get backgroundStyle() {
    return {
      backgroundImage: this.breedImage ? `url(${this.breedImage})` : 'none',
    };
  }
}
</script>

<style scoped lang="scss">
.breed-card {
  width: 200px;
  height: 200px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  position: relative;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  border: 2px solid rgb(200, 200, 200);
  border-radius: 10px;
  cursor: pointer;

  .breed-name {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .image-count {
    font-size: 1rem;
    opacity: 0.8;
    text-align: center;
    position: relative;
    z-index: 1;
    margin-top: 5px;
  }
}
</style>
