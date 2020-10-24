import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { sendMessage } from "../../services/messageService";
import { toast } from "react-toastify";
import { MdSend } from "react-icons/md";

class MessageForm extends Form {
  state = {
    data: { text: "" },
    errors: {},
  };

  schema = {
    text: Joi.string().required().label("Message Text"),
  };

  constructor(props) {
    super(props);
    if (props.type === "friend") {
      if (!props.sendTo)
        this.schema.to = Joi.string().required().label("Send to");
      this.setState({ to: props.sendTo ? props.sendTo._id : "" });
    }
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    if (this.state.sendTo) data.to = this.state.sendTo._id;
    else if (this.props.sendTo) data.to = this.props.sendTo._id;
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
            !this.props.sendTo &&
            this.renderSelect("to", "Send to", this.props.friends)}
          {this.renderAreaInput(
            "text",
            this.props.sendTo
              ? "Message " + this.props.sendTo.username
              : this.props.type === "self"
              ? "Message Myself"
              : "Message",
            this.props.rows || 3,
            "autofocus"
          )}
          {this.renderValidatedButton(<MdSend />)}
        </form>
      </div>
    );
  }
}

export default MessageForm;
