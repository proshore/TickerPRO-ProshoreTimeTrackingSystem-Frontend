const DashboardView = () => import("../views/DashboardView.vue");

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
];

export default dashboardRoutes;
