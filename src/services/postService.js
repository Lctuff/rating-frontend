import http from "./httpService";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/posts";

export function getPosts() {
  return http.get(apiEndpoint);
}
export function getPost(postId) {
  return http.get(apiEndpoint + "/" + postId);
}

export function savePost(post) {
  if (post._id) {
    const body = { ...post };

    delete body._id;

    return http.put(apiEndpoint + "/" + post._id, body);
  }

  return http.post(apiEndpoint, post);
}

export function deletePost(postId) {
  return http.delete(apiEndpoint + "/" + postId);
}
export function uploadImg(data) {
  return http.post(config.nonapi + "/upload", data);
}
