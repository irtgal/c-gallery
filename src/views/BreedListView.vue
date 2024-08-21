<template>
  <div class="breed-list">
    <h2>Select a Breed</h2>
    <div class="breeds">
      <BreedCard v-for="breed in breeds" :key="breed" :breed="breed" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex';
import BreedCard from '@/components/BreedCard.vue';

@Component({
  components: {
    BreedCard,
  },
  computed: {
    ...mapState('breeds', ['breeds']),
  },
  methods: {
    ...mapActions('breeds', ['fetchBreeds']),
  },
})
export default class BreedListView extends Vue {
  created() {
    this.fetchBreeds();
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