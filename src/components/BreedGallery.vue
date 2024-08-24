<template>
  <div v-if="breed.images && breed.images.length" class="breed-gallery">
    <div class="image-viewer">
      <img v-if="!!currentImage" :src="currentImage" :alt="breed.name" />
    </div>
    <GalleryNavigation
        :images="breed?.images"
        @selectImageIndex="imageIndexChanged"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Breed } from '@/types';
import GalleryNavigation from './GalleryNavigation.vue';

@Component({
  components: {
    GalleryNavigation,
  },
})
export default class BreedGallery extends Vue {
  // Props
  @Prop({ required: true }) breed!: Breed;

  // Data
  selectedImageIndex = 0;

  // Computed
  get currentImage(): string | undefined {
    return this.breed?.images && this.breed.images[this.selectedImageIndex];
  }

  // Methods
  imageIndexChanged(index: number): void {
    this.selectedImageIndex = index;
  }
}
</script>


<style lang="scss">
.breed-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  .image-viewer {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    img {
      width: 100%;
      max-width: 500px;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>