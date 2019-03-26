import axios from "axios";

export const HTTP = axios.create({
  // baseURL: "http://178.128.138.0:8090",
  baseURL: "http://localhost:8090",
  headers: {
    "Content-Type": "application/json"
  }
});

HTTP.defaults.withCredentials = true;
