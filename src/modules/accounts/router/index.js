const LoginView = () => import("../views/LoginView.vue");
const ViewSignup = () => import("../views/ViewSignup.vue");
const ViewRegister = () => import("../views/ViewRegister.vue")

const accountsRoutes = [
  {
    path: "/accounts/signup",
    name: "signup",
    component: ViewSignup,
  },
  {
    path: "/accounts/registersuccess",
    name: "register",
    component: ViewRegister,
  },
   {
    path: "/accounts/login",
    name: "login",
    component: LoginView,
  },
];

export default accountsRoutes;
