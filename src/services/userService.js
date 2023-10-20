import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/user";

export function register(user) {
  return http.post(apiEndpoint, user);
}
