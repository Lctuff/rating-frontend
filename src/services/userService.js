import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/user";

export function register(user) {
  return http.post(apiEndpoint, user);
}

export function deleteUser(user) {
  return http.delete(apiEndpoint + "/" + user._id);
}

export function saveUser(user) {
  const body = { ...user };

  delete body._id;
  console.log(body);

  return http.put(apiEndpoint + "/" + user._id, body);
}
