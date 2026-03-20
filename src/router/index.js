import { createRouter, createWebHistory } from "vue-router";
import typeSpeedTest from "../views/typeSpeedTest.vue";
import typeSpeedTestResult from "../views/typeSpeedTestResult.vue";

const routes = [
    { path: "/", name: "home", component: typeSpeedTest },
    { path: "/result", name: "result", component: typeSpeedTestResult },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;