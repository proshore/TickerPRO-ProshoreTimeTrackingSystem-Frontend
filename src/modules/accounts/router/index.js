const LoginView = () => import("../views/LoginView.vue");
const ViewSignup = () => import("../views/ViewSignup.vue");
const Notification = () => import("../views/Notification.vue")

const accountsRoutes = [
  {
    path: "/accounts/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/accounts/signup",
    name: "signup",
    component: ViewSignup,
  },
  {
     path: "/accounts/sucess",
    name: "registered",
    component: Notification,
  },
];

export default accountsRoutes;
