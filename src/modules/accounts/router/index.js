const ViewLogin = () => import("../views/ViewLogin.vue");
const ViewPasswordForgot = () => import("../views/ViewPasswordForgot.vue");
const ViewPasswordResetSent = () =>
  import("../views/ViewPasswordResetSent.vue");
const ViewPasswordReset = () => import("../views/ViewPasswordReset.vue");

const accountsRoutes = [
  {
    path: "/accounts/login",
    name: "login",
    component: ViewLogin,
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
    path: "/reset-password",
    name: "passwordReset",
    component: ViewPasswordReset,
  },
];

export default accountsRoutes;
