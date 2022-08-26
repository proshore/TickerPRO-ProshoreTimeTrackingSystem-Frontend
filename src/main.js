import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App);

const $toast = useToast();
$toast.success('You did it!');

app.use(router);
app.use(createPinia());

app.mount("#app");

import "bootstrap/dist/js/bootstrap.min.js";
