const LoginView = () => import("../views/LoginView.vue");

const accountsRoutes = [
  {
    path: "/accounts/login",
    name: "login",
    component: LoginView,
  },
];

export default accountsRoutes;
