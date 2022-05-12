const ViewTeams = () => import("../views/ViewTeams.vue");

const teamsRoutes = [
  {
    path: "/teams",
    name: "teams",
    component: ViewTeams,
    meta: {
      requiresAuth: true,
    },
  },
];

export default teamsRoutes;
