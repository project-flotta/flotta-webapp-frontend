import {createRouter, createWebHistory} from 'vue-router';
import App from './App.vue';

const routes = [
    {
        path: '/',
        name: 'app',
        component: App,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('./pages/Dashboard.vue')
            },
            {
                path: '/devices',
                name: 'devices',
                component: () => import('./pages/Devices.vue')
            },
            {
                path: '/devices/:id',
                name: 'device',
                component: () => import('./pages/Device.vue')
            },
            {
                path: '/devices/:id/network',
                name: 'devicenetowrk',
                component: () => import('./pages/Network.vue')
            },
            {
                path: '/devices/:id/cputemp',
                name: 'devicecputemp',
                component: () => import('./pages/CpuTemp.vue')
            },
            {
                path: "/devices/:id/feed",
                name: "feed",
                component: () => import('./views/Feed.vue')
            },
            {
                path: "/devices/:id/feed/:id",
                name: "photo",
                component: () => import('./views/Photo.vue')
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
