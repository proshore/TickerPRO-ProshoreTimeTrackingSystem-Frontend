import { createApp } from "vue";
import Toaster from "@meforma/vue-toaster";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(Toaster);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.min.js";
