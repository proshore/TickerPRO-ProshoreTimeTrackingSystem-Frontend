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
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () => import("@/views/PageNotFound.vue"),
    },
    {
      path: "/addProject",
      name: "addProject",
      component: () => import("@/views/addProject.vue"),
    },
  ],
});

export default router;
