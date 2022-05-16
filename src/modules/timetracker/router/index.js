const ViewTimetracker = () => import("../views/ViewTimetracker.vue");

const timetrackerRoutes = [
  {
    path: "/timetracker",
    name: "timetracker",
    component: ViewTimetracker,
    meta: {
      requiresAuth: true,
    },
  },
];

export default timetrackerRoutes;
