<template>
  <div v-if="selectedBreed" class="breed-details">
    <BreedGallery :breed="selectedBreed" />

    <div class="breed-info">
      <h2>Sub Breeds</h2>
      <div v-if="selectedBreed.subBreeds?.length > 0" class="breeds">
        <!-- BreedCard -->
        <BreedCard
            v-for="subBreed in selectedBreed.subBreeds"
            :breed="subBreed"
            :key="subBreed.name"
            @click="goToSubBreedDetail(subBreed)"
        ></BreedCard>
      </div>
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
  get breeds(): Breed[] {
    return this.$store.state.breeds.breeds;
  }

  get selectedBreed(): Breed | undefined {
    return this.$store.state.breeds.selectedBreed;
  }

  // Watchers
  @Watch('$route.params.breed')
  onBreedChange(newBreedName: string) {
    this.$store.dispatch('breeds/selectBreed', newBreedName);
  }

  // Hooks
  async mounted() {
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

  // Methods
  goToSubBreedDetail(subBreed: Breed) {
    this.$router.push({ name: 'BreedDetail', params: { breed: subBreed.name } });
  }

}
</script>

<style lang="scss" scoped>
.breed-list {
  text-align: center;
}
.breeds {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>