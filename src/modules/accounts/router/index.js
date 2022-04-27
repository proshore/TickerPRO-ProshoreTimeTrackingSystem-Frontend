const LoginView = () => import("../views/LoginView.vue");
const ViewForgotPassword = () => import("../views/ViewForgotPassword.vue");

const accountsRoutes = [
  {
    path: "/accounts/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/accounts/forgot-password",
    name: "forgotPassword",
    component: ViewForgotPassword,
  },
];

export default accountsRoutes;
