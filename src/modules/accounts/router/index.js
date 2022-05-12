import logout from "../utils/logoutUser";

const ViewLogin = () => import("../views/ViewLogin.vue");
const ViewSignup = () => import("../views/ViewSignup.vue");
const ViewPasswordForgot = () => import("../views/ViewPasswordForgot.vue");
const ViewPasswordResetSent = () =>
  import("../views/ViewPasswordResetSent.vue");
const ViewPasswordReset = () => import("../views/ViewPasswordReset.vue");

const accountsRoutes = [
  {
    path: "/register/:token",
    name: "signup",
    component: ViewSignup,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/accounts/login",
    name: "login",
    component: ViewLogin,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/accounts/password-forgot",
    name: "passwordForgot",
    component: ViewPasswordForgot,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/accounts/password-reset-sent",
    name: "passwordResetSent",
    component: ViewPasswordResetSent,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/reset-password",
    name: "passwordReset",
    component: ViewPasswordReset,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/accounts/logout",
    name: "logout",
    meta: {
      requiresAuth: true,
    },
    beforeEnter: [logout],
  },
];

export default accountsRoutes;
