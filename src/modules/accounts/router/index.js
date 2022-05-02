const LoginView = () => import("../views/LoginView.vue");
const ViewForgotPassword = () => import("../views/ViewForgotPassword.vue");
const ViewPasswordResetSent = () =>
  import("../views/ViewPasswordResetSent.vue");
const ViewPasswordReset = () => import("../views/ViewPasswordReset.vue");

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
  {
    path: "/accounts/password-reset-sent",
    name: "passwordResetSent",
    component: ViewPasswordResetSent,
  },
  {
    path: "/accounts/password-reset",
    name: "passwordReset",
    component: ViewPasswordReset,
  },
];

export default accountsRoutes;
