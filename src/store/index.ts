import Vue from 'vue';
import Vuex from 'vuex';

import breeds from './breeds';
import app from './app';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        breeds,
        app,
    },
});