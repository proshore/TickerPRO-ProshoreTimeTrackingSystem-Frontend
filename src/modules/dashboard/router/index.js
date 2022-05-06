const DashboardView = () => import("../views/DashboardView.vue");

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
  },
];

export default dashboardRoutes;
