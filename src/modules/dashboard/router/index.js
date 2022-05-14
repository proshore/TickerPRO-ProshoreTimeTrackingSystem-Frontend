const DashboardView = () => import("@/components/TheSidebar.vue");

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
