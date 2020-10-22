import http from "./httpService";

export async function addFriend(username) {
  try {
    return await http.post(http.usersEndpoint + "/friends/add/" + username);
  } catch (ex) {
    return ex.response;
  }
}
