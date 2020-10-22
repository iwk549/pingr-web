import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { sendMessage } from "../../services/messageService";
import { toast } from "react-toastify";

class MessageForm extends Form {
  state = {
    data: { title: "", text: "" },
    errors: {},
  };

  schema = {
    title: Joi.string().optional().allow("").label("Title"),
    text: Joi.string().required().label("Message Text"),
  };

  constructor(props) {
    super(props);
    if (props.type === "friend") {
      this.schema.to = Joi.string().required().label("Send to");
      this.setState({ to: "" });
    }
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    if (data.to === "Make a selection...")
      return toast("Please select a recipient.");
    const response = await sendMessage(data);
    if (response.status === 200) window.location = "/messages";
    else toast.error(response.data);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.props.type === "friend" &&
            this.renderSelect("to", "Send to", this.props.friends)}
          {this.renderInput("title", "Title", "autofocus")}
          {this.renderAreaInput("text", "Message")}
          {this.renderValidatedButton("Send")}
        </form>
      </div>
    );
  }
}

export default MessageForm;
