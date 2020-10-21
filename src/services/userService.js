import http from "./httpService";

export async function getUserInfo() {
  try {
    return await http.get(http.usersEndpoint);
  } catch (ex) {
    return ex.response;
  }
}

export async function registerNewUser(user) {
  try {
    return await http.post(http.usersEndpoint, user);
  } catch (ex) {
    return ex.response;
  }
}
