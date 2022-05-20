import { createRouter, createWebHistory } from "vue-router";

import getUser from "@/utils/getUser";

import accountsRoutes from "@/modules/accounts/router";
import dashboardRoutes from "@/modules/dashboard/router";
import teamsRoutes from "@/modules/teams/router";
import projectsRoutes from "@/modules/projects/router";
import clientsRoutes from "@/modules/clients/router";
import reportsRoutes from "@/modules/reports/router";
import worksRoutes from "@/modules/works/router";
import trackerRoutes from "@/modules/tracker/router";

const ViewPageNotFound = () => import("@/views/ViewPageNotFound.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "login" },
      meta: {
        requiresAuth: false,
      },
    },
    ...accountsRoutes,
    ...dashboardRoutes,
    ...teamsRoutes,
    ...projectsRoutes,
    ...clientsRoutes,
    ...reportsRoutes,
    ...worksRoutes,
    ...trackerRoutes,
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: ViewPageNotFound,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from) => {
  const isLoggedIn = getUser();

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: "login", query: { next: to.fullPath } };
  } else if (isLoggedIn && !to.meta.requiresAuth) {
    return { name: "tracker" };
  }
});

export default router;
