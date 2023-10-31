import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/comment";

export function saveComment(post, comment) {
  if (comment._id) {
    const body = { ...comment };

    delete body._id;

    return http.put(apiEndpoint + "/" + post._id, body);
  }

  return http.post(apiEndpoint + "/" + post._id, comment);
}
