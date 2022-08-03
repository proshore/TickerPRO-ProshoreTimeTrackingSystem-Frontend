const ViewSettings = () => import("../views/ViewSettings.vue");

const settingsRoutes = [
  {
    path: "/settings",
    name: "settings",
    component: ViewSettings,
    meta: {
      requiresAuth: true,
    },
  },
];

export default settingsRoutes;
