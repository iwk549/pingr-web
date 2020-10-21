import http from "./httpService";

export async function loginUser(user) {
  try {
    const response = await http.post(http.authEndpoint, user);
    localStorage.setItem("loggedIn", "true");
    return response;
  } catch (ex) {
    return ex.response;
  }
}

export async function logoutUser() {
  try {
    const response = await http.post(http.authEndpoint + "/logout");
    localStorage.removeItem("loggedIn");
    return response;
  } catch (ex) {
    return ex.response;
  }
}

export async function checkLoginStatus() {
  try {
    const response = await http.get(http.authEndpoint);
    return response;
  } catch (ex) {
    return ex.response;
  }
}
