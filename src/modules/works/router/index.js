const ViewWorks = () => import("../views/ViewWorks.vue");

const worksRoutes = [
  {
    path: "/works",
    name: "works",
    component: ViewWorks,
    meta: {
      requiresAuth: true,
    },
  },
];

export default worksRoutes;
