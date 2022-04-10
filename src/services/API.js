import axios from "axios";

import envVariables from "@/config/envVariables";

const { BACKEND_URI } = envVariables;

const Api = axios.create({
  baseURL: `${BACKEND_URI}`,
});

Api.defaults.withCredentials = true;

export default Api;
