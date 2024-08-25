<template>
  <div class="gallery-navigation">
    <div class="thumbnails-wrapper">
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

  maxVisibleThumbnails = 5;

  // Computed
  get visibleThumbnails() {
    const totalImages = this.images.length;

    if (totalImages <= this.maxVisibleThumbnails) {
      return this.images;
    }

    const offset = Math.floor(this.maxVisibleThumbnails / 2);
    let start = Math.max(this.selectedIndex - offset, 0);
    let end = Math.min(start + this.maxVisibleThumbnails, totalImages);

    if (end === totalImages) {
      start = end - this.maxVisibleThumbnails;
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
    this.updateMaxVisibleThumbnails();

    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('resize', this.updateMaxVisibleThumbnails);
  }

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
    window.removeEventListener('resize', this.updateMaxVisibleThumbnails);
  }

  // Methods
  selectImageIndex(index: number): void {
    this.selectedIndex = index;
    this.$emit('selectImageIndex', index);
  }

  selectNextImage(): void {
    if (this.selectedIndex < this.images.length - 1) {
      this.selectImageIndex(this.selectedIndex + 1);
    }
  }

  selectPreviousImage(): void {
    if (this.selectedIndex > 0) {
      this.selectImageIndex(this.selectedIndex - 1);
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.selectNextImage();
    } else if (event.key === 'ArrowLeft') {
      this.selectPreviousImage();
    }
  }

  updateMaxVisibleThumbnails(): void {
    this.maxVisibleThumbnails = window.innerWidth < 768 ? 3 : 5;
  }
}
</script>

<style lang="scss">
.gallery-navigation {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 10px;
}

.thumbnails-wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
}

.thumbnail {
  flex: 0 0 auto;
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
    box-sizing: border-box;
    padding: 2px;

    border-radius: inherit;
  }
}
</style>
