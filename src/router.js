import VueRouter from 'vue-router';
import DashboardVue from './components/Dashboard.vue';

const routes = [
    {
        path: '/',
        component: DashboardVue,
        alias: '/home'
    },
];

const router = new VueRouter({
    routes,
});

export default router;