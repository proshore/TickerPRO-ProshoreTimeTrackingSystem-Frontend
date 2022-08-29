import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import 'vue-toast-notification/dist/theme-sugar.css';

import "bootstrap/dist/js/bootstrap.min.js";

const app = createApp(App);


app.use(router);
app.use(createPinia());

app.mount("#app");


