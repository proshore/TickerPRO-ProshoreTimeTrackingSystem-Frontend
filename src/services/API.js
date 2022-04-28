import axios from "axios";

import envVariables from "@/config/envVariables";

axios
  .get("https://ccbackend.herokuapp.com/sanctum/csrf-cookie")
  .then((resp) => {
    console.log(resp.headers["set-cookie"][0]);
  })
  .catch((error) => console.log(error));

axios.defaults.headers.common = {
  "X-Requested-With": "XMLHttpRequest",
  "X-CSRF-TOKEN": document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content"),
};

const { BACKEND_URI } = envVariables;

const API = axios.create({
  baseURL: `${BACKEND_URI}`,
  headers: {
    "content-type": "application/json",
  }
});

API.defaults.withCredentials = true;

export default API;
