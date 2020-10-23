import http from "./httpService";

export async function addFriend(username) {
  try {
    return await http.post(http.usersEndpoint + "/friends/add/" + username);
  } catch (ex) {
    return ex.response;
  }
}

export async function confirmFriend(friend) {
  try {
    return await http.put(
      http.usersEndpoint + "/friends/confirm/" + friend._id
    );
  } catch (ex) {
    return ex.reponse;
  }
}

export async function deleteFriend(friend) {
  try {
    return await http.delete(
      http.usersEndpoint + "/friends/delete/" + friend._id
    );
  } catch (ex) {
    return ex.response;
  }
}
