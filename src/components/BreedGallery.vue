<template>
  <div v-if="breed" class="gallery-container">
    <div class="image-viewer">
      <button @click="goToPrev" :disabled="isFirstImage">Previous</button>
      <img :src="currentImage" :alt="breed.name" />
      <button @click="goToNext" :disabled="isLastImage">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import { Breed } from '@/types';

@Component
export default class BreedGallery extends Vue {

  // Props
  @Prop({ required: true }) breed!: Breed;

  // Data
  selectedImageIndex = 0;

  // Computed
  get currentImage(): string | undefined {
    return this.breed?.images && this.breed.images[this.selectedImageIndex];
  }

  get isFirstImage(): boolean {
    return this.selectedImageIndex === 0;
  }

  get isLastImage(): boolean {
    return !!(this.breed?.images && this.selectedImageIndex === this.breed.images.length - 1);
  }


  // Methods
  goToPrev(): void {
    if (!this.isFirstImage) {
      this.selectedImageIndex = this.selectedImageIndex - 1;
    }
  }

  goToNext(): void {
    if (!this.isLastImage) {
      this.selectedImageIndex = this.selectedImageIndex + 1;
    }
  }
}
</script>

<style lang="scss">
.gallery-container {
  .image-viewer {
    display: flex;
    align-items: center;
    justify-content: center;
    button {
      margin: 0 10px;
    }
    img {
      max-width: 500px;
      max-height: 400px;
      object-fit: cover;
    }
  }
}
</style>
