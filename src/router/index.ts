import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import BreedListView from '../views/BreedListView.vue';
import BreedDetailView from '../views/BreedDetailView.vue';
import SubBreedDetailView from "@/views/SubBreedDetailView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'BreedList',
        component: BreedListView,
    },
    {
        path: '/breeds/:breed',
        name: 'BreedDetail',
        component: BreedDetailView,
        props: true,
    },
    {
        path: '/breeds/:breed/:subBreed',
        name: 'SubBreedDetail',
        component: SubBreedDetailView,
        props: true,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;