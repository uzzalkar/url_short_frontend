import { createRouter, createWebHistory } from 'vue-router'
import Create from '@/components/short-link/Create.vue'
import Home from '@/views/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },

    {
        path: '/short-link/create',
        name: 'short-link-create',
        component:Create
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
