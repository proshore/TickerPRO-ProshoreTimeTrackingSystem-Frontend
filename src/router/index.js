import { createRouter, createWebHistory } from "vue-router";

import accountsRoutes from "../modules/accounts/router";
import dashboardRoutes from "../modules/dashboard/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "login" },
    },
    ...accountsRoutes,
    ...dashboardRoutes,
  ],
});

export default router;
