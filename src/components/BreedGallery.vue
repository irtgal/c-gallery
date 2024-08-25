<template>
  <div class="breed-gallery">
    <div class="image-viewer">
      <img v-if="!!currentImage" :src="currentImage" :alt="breed.name" />
    </div>
    <GalleryNavigation
        v-if="breed.images"
        :images="breed?.images"
        @selectImageIndex="imageIndexChanged"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Breed } from '@/types';
import GalleryNavigation from './GalleryNavigation.vue';

@Component({
  components: {
    GalleryNavigation,
  },
})
export default class BreedGallery extends Vue {
  // Props
  // @Prop({ required: true }) breed!: Breed;

  // Data
  selectedImageIndex = 0;

  // Computed

  get breed(): Breed  | undefined {
    return this.$store.state.breeds.selectedBreed;
  }
  get currentImage(): string | undefined {
    console.log(this.breed?.name);
    console.log('Updating currentImage with index:', this.selectedImageIndex, this.breed, this.breed?.images);
    return this.breed?.images && this.breed?.images[this.selectedImageIndex];
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
  box-sizing: border-box;

  .image-viewer {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    height: 50vh;

    img {
      width: 100%;
      max-height: 50vh;;
      object-fit: contain;
      border-radius: 8px;
    }
  }
}
</style>