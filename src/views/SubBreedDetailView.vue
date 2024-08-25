<template>
  <div v-if="selectedSubBreed" class="breed-details">
    <BreedGallery :key="selectedSubBreed.name" :breed="selectedSubBreed" />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {SubBreed} from "@/types";
import BreedGallery from "@/components/BreedGallery.vue";
import BreedCard from "@/components/BreedCard.vue";

@Component({
  components: {
    BreedCard,
    BreedGallery,
  },
})
export default class SubBreedDetailView extends Vue {

  // Computed

  get selectedSubBreed(): SubBreed | undefined {
    return this.$store.state.breeds.selectedSubBreed;
  }


  // Hooks
  mounted() {
    this.init();
  }

  // Methods

  @Watch('$route.params.subBreed')
  async init() {
    const breedName = this.$route.params.breed;
    const subBreedName = this.$route.params.subBreed;
    if (!breedName) {
      this.$router.push({ name: 'BreedList' });
      return;
    }
    if (!subBreedName) {
      this.$router.push({ name: 'BreedDetail', params: { breed: breedName } });
      return;
    }

    const title = `${subBreedName} / ${breedName}`;
    this.$store.dispatch('app/updateTitle', title);

    try {
      this.$store.dispatch('app/setLoading', true);
      await this.$store.dispatch('breeds/selectSubBreed', {breedName, subBreedName});
    } catch (error) {
      this.$store.dispatch('app/setError', 'An error occurred while loading breed details');
    } finally {
      this.$store.dispatch('app/setLoading', false);
    }
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