import { Module } from 'vuex';
import {AppState} from "@/types";



const appModule: Module<AppState, any> = {
    namespaced: true,

    state: {
        title: 'Dog Breeds Gallery',
        error: null,
    },

    mutations: {
        SET_TITLE(state, newTitle: string) {
            state.title = newTitle;
        },
        SET_ERROR(state, error: string | null) {
            state.error = error;
        },
    },

    actions: {
        updateTitle({ commit }, newTitle: string) {
            commit('SET_TITLE', newTitle);
        },
        setError({ commit }, error: string | null) {
            commit('SET_ERROR', error);
        },
    },

    getters: {
        title(state): string {
            return state.title;
        },
        error(state): string | null {
            return state.error;
        },
    },
};

export default appModule;