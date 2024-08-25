<template>
  <div v-if="selectedBreed" class="breed-details">
    <BreedGallery :breed="selectedBreed" />

    <div class="breed-info">

      <template v-if="selectedBreed.subBreeds?.length">
        <h2 class="text-center mt-5">Sub Breeds</h2>
        <div v-if="selectedBreed.subBreeds?.length > 0" class="breeds">
          <!-- BreedCard -->
          <BreedCard
              v-for="subBreed in selectedBreed.subBreeds"
              :breed="subBreed"
              :key="subBreed.name"
              @selected="goToSubBreedDetail(subBreed)"
          ></BreedCard>
        </div>
      </template>

    </div>

  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Breed} from "@/types";
import BreedGallery from "@/components/BreedGallery.vue";
import BreedCard from "@/components/BreedCard.vue";

@Component({
  components: {
    BreedCard,
    BreedGallery,
  },
})
export default class BreedDetailView extends Vue {

  // Computed

  get selectedBreed(): Breed | undefined {
    return this.$store.state.breeds.selectedBreed;
  }

  // Watchers

  // Hooks
  mounted() {
    this.init();
  }

  // Methods
  @Watch('$route.params.breed')
  async init() {
    const breedNameParam = this.$route.params.breed;
    if (!breedNameParam) {
      this.$router.push({ name: 'BreedList' });
      return;
    }
    this.$store.dispatch('app/updateTitle', breedNameParam);

    try {
      this.$store.dispatch('app/setLoading', true);
      await this.$store.dispatch('breeds/selectBreed', breedNameParam);
    } catch (error) {
      this.$store.dispatch('app/setError', 'An error occurred while loading breed details');
    } finally {
      this.$store.dispatch('app/setLoading', false);
    }
  }
  goToSubBreedDetail(subBreed: Breed) {
    if (!this.selectedBreed) {
      return;
    }
    this.$router.push({ name: 'SubBreedDetail', params: { breed: this.selectedBreed.name, subBreed: subBreed.name } });
  }

}
</script>

<style lang="scss" scoped>
.breeds {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>