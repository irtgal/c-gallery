import { Module } from 'vuex';
import { BreedsState, Breed } from '@/types';
import { fetchBreeds, fetchBreedImages } from '@/api/dogApi';

const breedsModule: Module<BreedsState, any> = {
    namespaced: true,

    state: {
        breeds: [],
        selectedBreed: null,
        breedsLoaded: false,
    },

    mutations: {
        SET_BREEDS(state, breeds: Breed[]) {
            state.breeds = breeds;
            state.breedsLoaded = true;
        },
        SET_SELECTED_BREED(state, breed: Breed) {
            state.selectedBreed = breed;
        },
        SET_BREED_IMAGES(state, { breedName, images }: { breedName: string, images: string[] }) {
            const breed = state.breeds.find(b => b.name === breedName);
            if (breed) {
                breed.images = images;
            }
        },
    },

    actions: {
        async loadBreeds({ state, commit }) {
            if (state.breedsLoaded) {
                return;
            }

            try {
                const data = await fetchBreeds();
                const breeds: Breed[] = Object.keys(data.message).map(breedName => ({
                    name: breedName,
                    subBreeds: data.message[breedName].map(subBreedName => ({
                        name: subBreedName,
                    })),
                }));
                commit('SET_BREEDS', breeds);
            } catch (error) {
                console.error('Error loading breeds:', error);
            }
        },

        async selectBreed({ state, commit, dispatch }, breedName: string) {
            await dispatch('loadBreeds');
            const breed = state.breeds.find(b => b.name === breedName);
            if (breed) {
                commit('SET_SELECTED_BREED', breed);
                if (!breed.images) {
                    await dispatch('loadBreedImages', breedName);
                }
            }
        },

        async loadBreedImages({ commit }, breedName: string) {
            try {
                const images = await fetchBreedImages(breedName);
                commit('SET_BREED_IMAGES', { breedName, images });
            } catch (error) {
                console.error('Error loading breed images:', error);
            }
        },
    },

    getters: {
        allBreeds(state): Breed[] {
            return state.breeds;
        },
        selectedBreed(state): Breed | null {
            return state.selectedBreed;
        },
        breedImages(state): string[] {
            return state.selectedBreed?.images || [];
        },
        subBreeds(state): Breed[] {
            return state.selectedBreed?.subBreeds || [];
        },
    },
};

export default breedsModule;