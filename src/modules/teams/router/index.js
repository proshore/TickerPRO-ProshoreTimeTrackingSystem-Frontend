const ViewTeams = () => import("../views/ViewTeams.vue");

const teamsRoutes = [
  {
    path: "/teams",
    name: "teams",
    component: ViewTeams,
  },
];

export default teamsRoutes;
