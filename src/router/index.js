import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        redirect: "/Home",
        name: "Home",
        component: () => import("../views/index.vue"),
        children: [
            {
                path: "/home",
                name: "home",
                component: () => import("../views/Home/index.vue"),
            },
            {
                path: "/health",
                name: "health",
                component: () => import("../views/HealthRecord/index.vue"),
            },
            {
                path: "tool",
                name: "tool",
                component: () => import("../views/Tool/index.vue"),
            },
            {
                path: "articles",
                name: "articles",
                component: () => import("../views/Articles/index.vue"),
            },
            {
                path: "store",
                name: "store",
                component: () => import("../views/store/index.vue"),
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login/index.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
