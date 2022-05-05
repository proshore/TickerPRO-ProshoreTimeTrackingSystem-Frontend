const ViewLogin = () => import("../views/ViewLogin.vue");
const ViewSignup = () => import("../views/ViewSignup.vue");
const ViewRegister = () => import("../views/ViewRegister.vue");

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
];

export default accountsRoutes;
