<template>
  <div v-if="selectedBreed" class="breed-list">
    <h2>Selected breed: {{selectedBreed.name}}</h2>
    <BreedGallery :breed="selectedBreed" />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import {Breed} from "@/types";
import BreedGallery from "@/components/BreedGallery.vue";

@Component({
  components: {
    BreedGallery,
  },
})
export default class BreedListView extends Vue {

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
  async created() {
    const breedNameParam = this.$route.params.breed;
    if (breedNameParam) {
      this.$store.dispatch('breeds/selectBreed', breedNameParam);
    }
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