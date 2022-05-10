import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/addTeam",
      name: "addTeam",
      component: () => import("@/views/AddTeam.vue"),
    },
  ],
});

export default router;
