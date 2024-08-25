import { Module } from 'vuex';
import {AppState} from "@/types";



const appModule: Module<AppState, any> = {
    namespaced: true,

    state: {
        title: 'Dog Breeds Gallery',
        error: null,
        loading: false,
    },

    mutations: {
        SET_TITLE(state, newTitle: string) {
            state.title = newTitle;
        },
        SET_ERROR(state, error: string | null) {
            state.error = error;
        },
        SET_LOADING(state, isLoading: boolean) {
            state.loading = isLoading;
        },
    },

    actions: {
        updateTitle({ commit }, newTitle: string) {
            commit('SET_TITLE', newTitle);
        },
        setError({ commit }, error: string | null) {
            commit('SET_LOADING', false);
            commit('SET_ERROR', error);
        },
        setLoading({ commit }, isLoading: boolean) {
            commit('SET_ERROR', null);
            commit('SET_LOADING', isLoading);
        },
    },

    getters: {
        title(state): string {
            return state.title;
        },
        error(state): string | null {
            return state.error;
        },
        loading(state): boolean {
            return state.loading;
        },
    },
};

export default appModule;