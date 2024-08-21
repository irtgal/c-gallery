import Vue from 'vue';
import Vuex from 'vuex';
import breeds from './breeds';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        breeds,
    },
});