const ViewClients = () => import("../views/ViewClients.vue");

const clientsRoutes = [
  {
    path: "/clients",
    name: "clients",
    component: ViewClients,
    meta: {
      requiresAuth: true,
    },
  },
];

export default clientsRoutes;
