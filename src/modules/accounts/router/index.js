const ViewLogin = () => import("../views/ViewLogin.vue");
const ViewSignup = () => import("../views/ViewSignup.vue");
const ViewRegister = () => import("../views/ViewRegister.vue");
const ViewPasswordForgot = () => import("../views/ViewPasswordForgot.vue");
const ViewPasswordResetSent = () =>
  import("../views/ViewPasswordResetSent.vue");
const ViewPasswordReset = () => import("../views/ViewPasswordReset.vue");

const accountsRoutes = [
  {
    path: "/accounts/signup/:token",
    name: "signup",
    component: ViewSignup,
  },
  {
    path: "/accounts/registersuccess",
    name: "registerSuccess",
    component: ViewRegister,
  },
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
