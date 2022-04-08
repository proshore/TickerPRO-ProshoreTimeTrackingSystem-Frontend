import { createRouter, createWebHistory } from "vue-router";

import accountsRoutes from "../modules/accounts/router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: { name: "login" },
    },
    ...accountsRoutes,
  ],
});

export default router;
