const ViewProjects = () => import("../views/ViewProjects.vue");

const projectsRoutes = [
  {
    path: "/projects",
    name: "projects",
    component: ViewProjects,
    meta: {
      requiresAuth: true,
    },
  },
];

export default projectsRoutes;
