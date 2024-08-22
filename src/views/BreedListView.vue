<template>
  <div class="breed-list">
    <h2>Select a Breed</h2>
    <div class="breeds">
      <BreedCard v-for="breed in breeds" :key="breed.name" :breed="breed" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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

  // Hooks
  created() {
    this.fetchBreeds();
  }

  // Methods
  fetchBreeds() {
    this.$store.dispatch('breeds/loadBreeds');
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