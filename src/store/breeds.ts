import { Module } from 'vuex';
import {BreedsState, Breed, SubBreed} from '@/types';
import {fetchBreeds, fetchBreedImages, fetchSubBreedImages} from '@/api/dogApi';

const breedsModule: Module<BreedsState, any> = {
    namespaced: true,

    state: {
        breeds: [],
        selectedBreed: null,
        selectedSubBreed: null,
        breedsLoaded: false,
    },

    mutations: {
        SET_BREEDS(state, breeds: Breed[]) {
            state.breeds = breeds;
            state.breedsLoaded = true;
        },
        SET_BREED_IMAGES(state, { breedName, images }: { breedName: string, images: string[] }) {
            const breed = state.breeds.find(b => b.name === breedName);
            if (breed) {
                breed.images = images;
            }
        },
        SET_SUB_BREED_IMAGES(state, { breedName, subBreedName, images }: { breedName: string, subBreedName: string, images: string[] }) {
            const breed = state.breeds.find(b => b.name === breedName);
            if (breed) {
                const subBreed = breed.subBreeds?.find(sb => sb.name === subBreedName);
                if (subBreed) {
                    subBreed.images = images;
                }
            }
        },
        SET_SELECTED_BREED(state, breed: Breed | null) {
            state.selectedBreed = breed;
        },
        SET_SELECTED_SUB_BREED(state, subBreed: SubBreed | null) {
            state.selectedSubBreed = subBreed;
        },
    },

    actions: {
        async loadBreeds({ state, commit, dispatch }) {
            if (state.breedsLoaded) {
                return;
            }

            try {
                const data = await fetchBreeds();
                const breeds: Breed[] = Object.keys(data.message).map(breedName => ({
                    name: breedName,
                    subBreeds: data.message[breedName].map(subBreedName => ({
                        name: subBreedName,
                        parentBreed: breedName,
                    } as SubBreed )),
                }));
                commit('SET_BREEDS', breeds);
            } catch (error) {
                dispatch('app/setError', 'Failed to load breeds', { root: true });

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

        async loadSubBreedImages({ commit }, { breedName, subBreedName }: { breedName: string, subBreedName: string }) {
            try {
                const images = await fetchSubBreedImages(breedName, subBreedName);
                commit('SET_SUB_BREED_IMAGES', { breedName, subBreedName, images });
            } catch (error) {
                console.error('Error loading sub-breed images:', error);
            }
        },

        async selectBreed({ state, commit, dispatch }, breedName: string) {
            await dispatch('loadBreeds');
            const breed = state.breeds.find(b => b.name === breedName);
            if (breed) {
                if (!breed.images) {
                    await dispatch('loadBreedImages', breedName);
                }
                commit('SET_SELECTED_BREED', breed);
            }
        },
        async selectSubBreed({ state, commit, dispatch }, { breedName, subBreedName }: { breedName: string, subBreedName: string }) {
            await dispatch('loadBreeds');
            console.log({breedName, subBreedName});
            const breed = state.breeds.find(b => b.name === breedName);
            console.log({breed});
            if (breed) {
                const subBreed = breed.subBreeds?.find(sb => sb.name === subBreedName);
                console.log({subBreed});
                if (subBreed) {
                    if (!subBreed.images) {
                        await dispatch('loadSubBreedImages', { breedName, subBreedName });
                    }
                    commit('SET_SELECTED_SUB_BREED', subBreed);
                }
            }
        }
    },

    getters: {
    },
};

export default breedsModule;