import http from "./httpService";

export async function getMessages() {
  try {
    return http.get(http.usersEndpoint);
  } catch (ex) {
    return ex.response;
  }
}

export async function sendMessage(data) {
  if (data.to) {
    try {
      const friendID = data.to;
      delete data.to;
      return await http.post(http.usersEndpoint + "/message/" + friendID, data);
    } catch (ex) {
      return ex.response;
    }
  } else
    try {
      return await http.post(http.usersEndpoint + "/selfmessage", data);
    } catch (ex) {
      return ex.response;
    }
}

export async function deleteMessage(message) {
  try {
    return await http.delete(
      http.usersEndpoint +
        "/mymessages/" +
        message._id +
        "/" +
        String(message.time)
    );
  } catch (ex) {
    return ex.response;
  }
}
