<template>
  <div class="gallery-navigation">
    <div
        v-for="(image, index) in visibleThumbnails"
        :key="index"
        class="thumbnail"
        :class="{ 'active': images.indexOf(image) === selectedIndex }"
        @click="selectImageIndex(images.indexOf(image))"
    >
      <img :src="image" :alt="'Thumbnail ' + images.indexOf(image)" />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component
export default class GalleryNavigation extends Vue {
  // Props
  @Prop({ required: true }) images!: string[];
  @Prop() startIndex?: number;

  // Data
  selectedIndex = this.startIndex || 0;

  // Computed
  get visibleThumbnails() {
    const totalImages = this.images.length;
    const maxVisible = 5;

    if (totalImages <= maxVisible) {
      return this.images; // Show all images if less than or equal to maxVisible
    }

    const offset = Math.floor(maxVisible / 2);
    let start = Math.max(this.selectedIndex - offset, 0);
    let end = Math.min(start + maxVisible, totalImages);

    if (end === totalImages) {
      start = end - maxVisible;
    }

    return this.images.slice(start, end);
  }

  // Watchers
  @Watch('selectedIndex')
  onSelectedIndexChange(newIndex: number) {
    console.log('Selected index changed to', newIndex);
    this.$emit('selectImageIsndex', newIndex);
  }

  // Hooks
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  // Methods
  selectImageIndex(index: number): void {
    this.selectedIndex = index;
    this.$emit('selectImageIndex', index);
  }

  selectNextImage(): void {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectedIndex++;
      this.$emit('selectImageIndex', this.selectedIndex);
    }
  }

  selectPreviousImage(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
      this.$emit('selectImageIndex', this.selectedIndex);
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.selectNextImage();
    } else if (event.key === 'ArrowLeft') {
      this.selectPreviousImage();
    }
  }
}
</script>

<style lang="scss">
.gallery-navigation {
  display: flex;
  overflow-x: auto;
  margin-top: 20px;

  .thumbnail {
    height: 75px;
    width: 100px;
    cursor: pointer;
    margin: 0 5px;
    border: 2px solid transparent;
    border-radius: 5px;
    transition: border-color 0.2s;

    &.active {
      border-color: white;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
  }
}
</style>
