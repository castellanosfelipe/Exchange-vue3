import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";
import Error from "@/views/Error.vue";
import About from "@/views/About.vue";
import CoinDetail from "@/views/CoinDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/CoinDetail/:id(.*)",
    name: "Coin-Detail",
    component: CoinDetail,
  },
  {
    path: "/:catchAll(.*)",
    name: "error",
    component: Error,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: "active",
});

export default router;
