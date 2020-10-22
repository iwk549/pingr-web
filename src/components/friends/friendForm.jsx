import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { addFriend } from "../../services/friendService";
import { toast } from "react-toastify";

class FriendForm extends Form {
  state = {
    data: { username: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Message Text"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    const response = await addFriend(data.username);
    if (response.status === 200) window.location = "/friends";
    else toast.error(response.data);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "autofocus")}
          {this.renderValidatedButton("Send")}
        </form>
      </div>
    );
  }
}

export default FriendForm;
