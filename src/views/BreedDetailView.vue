<template>
  <div class="breed-list">
    <h2>Selected breed: {{selectedBreed.name}}</h2>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator';
import BreedCard from '@/components/BreedCard.vue';
import {Breed} from "@/types";

@Component({
  components: {
    BreedCard,
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

  get breedNameParam(): string | undefined {
    return this.$route.params.breed;
  }

  // Watchers
  @Watch('$route.params.breed')
  onBreedChange(newBreedName: string) {
    this.$store.dispatch('breeds/selectBreed', newBreedName);
  }

  // Hooks
  async created() {
    if (this.breedNameParam) {
      this.$store.dispatch('breeds/selectBreed', this.breedNameParam);
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