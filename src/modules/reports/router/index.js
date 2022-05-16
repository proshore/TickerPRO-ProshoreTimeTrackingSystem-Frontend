const ViewReports = () => import("../views/ViewReports.vue");

const reportsRoutes = [
  {
    path: "/reports",
    name: "reports",
    component: ViewReports,
    meta: {
      requiresAuth: true,
    },
  },
];

export default reportsRoutes;
