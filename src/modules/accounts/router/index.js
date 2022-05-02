const LoginView = () => import("../views/LoginView.vue");
const ViewPasswordForgot = () => import("../views/ViewPasswordForgot.vue");
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
    path: "/accounts/password-forgot",
    name: "passwordForgot",
    component: ViewPasswordForgot,
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
