import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("../views/Login/index.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
