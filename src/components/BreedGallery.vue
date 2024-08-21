<template>
  <div class="breed-gallery">
    <BreedCard v-for="(image, index) in breedImages" :key="index" :image="image" />
    <Pagination />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import BreedCard from '@/components/BreedCard.vue';
import Pagination from '@/components/Pagination.vue';

@Component({
  components: {
    BreedCard,
    Pagination,
  },
  computed: {
    ...mapState('breeds', ['breedImages']),
  },
})
export default class BreedGallery extends Vue {}
</script>

<style scoped lang="scss">
.breed-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>