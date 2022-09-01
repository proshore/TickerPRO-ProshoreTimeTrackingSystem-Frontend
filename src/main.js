import { createApp } from "vue";
import { createPinia } from "pinia";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueAwesomePaginate);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.min.js";
