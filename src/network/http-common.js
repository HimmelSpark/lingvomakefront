import axios from "axios";

export const HTTP = axios.create({
  // baseURL: "http://lingvomake.ml/back",
  baseURL: "http://localhost:8090",
  headers: {
    "Content-Type": "application/json"
  }
});

HTTP.defaults.withCredentials = true;
