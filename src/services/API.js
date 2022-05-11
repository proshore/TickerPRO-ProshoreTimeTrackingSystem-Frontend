import axios from "axios";

import envApp from "@/config/app";

const { BACKEND_URI } = envApp;

const API = axios.create({
  baseURL: `${BACKEND_URI}`,
});

API.defaults.withCredentials = true;

export default API;
