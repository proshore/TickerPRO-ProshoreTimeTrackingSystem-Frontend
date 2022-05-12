import { createRouter, createWebHistory } from "vue-router";

import getUser from "@/utils/getUser";

import accountsRoutes from "@/modules/accounts/router";
import dashboardRoutes from "@/modules/dashboard/router";
import teamsRoutes from "@/modules/teams/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "login" },
      meta: {
        requiresAuth: false,
      },
    },
    ...accountsRoutes,
    ...dashboardRoutes,
    ...teamsRoutes,
  ],
});

router.beforeEach((to, from) => {
  const isLoggedIn = getUser();

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { name: "login", query: { next: to.fullPath } };
  } else if (isLoggedIn && !to.meta.requiresAuth) {
    return { name: "dashboard" };
  }
});

export default router;
