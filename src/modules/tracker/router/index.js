const ViewTracker = () => import("../views/ViewTracker.vue");

const trackerRoutes = [
  {
    path: "/tracker",
    name: "tracker",
    component: ViewTracker,
    meta: {
      requiresAuth: true,
    },
  },
];

export default trackerRoutes;
