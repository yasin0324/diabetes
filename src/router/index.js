import { createRouter,createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home/Home.vue'),
        children: [
            {
                path: '/login',
                name: 'Login',
                component: () => import('../views/Home/Login.vue')
            },
            {
                path: '/register',
                name: 'Register',
                component: () => import('../views/Home/Register.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router