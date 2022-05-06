import axios from "axios";

import envVariables from "@/config/envVariables";

const { BACKEND_URI } = envVariables;

const API = axios.create({
  baseURL: `${BACKEND_URI}`,
});

API.defaults.withCredentials = true;

export default API;
