import React, { Component, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMessages, deleteMessage } from "../../services/messageService";
import MessageForm from "./messageForm";
import Loading from "../common/loading";
import PageHeader from "../common/pageHeader";

class Messages extends Component {
  state = {
    username: "",
    selfMessages: [],
    friendMessages: [],
    friends: [],
    selfMessageOpen: false,
    friendMessageOpen: false,
    loading: true,
  };

  async componentDidMount() {
    const response = await getMessages();
    if (response.status === 200) {
      let selfMessages = [];
      let friendMessages = [];
      response.data.messages.forEach((m) => {
        if (m.from === response.data._id) selfMessages.push(m);
        else friendMessages.push(m);
      });
      let friends = [];
      response.data.friends.forEach((f) => {
        if (f.confirmed) friends.push(f);
      });
      this.setState({
        username: response.data.username,
        selfMessages,
        friendMessages,
        friends,
      });
    }
    this.setState({ loading: false });
  }

  openMessageForm(type) {
    if (type === "self")
      this.setState({
        selfMessageOpen: this.state.selfMessageOpen ? false : true,
        friendMessageOpen: false,
      });
    else
      this.setState({
        friendMessageOpen: this.state.friendMessageOpen ? false : true,
        selfMessageOpen: false,
      });
  }

  handleDeleteMessage = async (message) => {
    const response = await deleteMessage(message);
    if (response.status === 200) window.location = "/messages";
    else toast.error(response.data);
  };

  render() {
    const {
      friends,
      selfMessages,
      friendMessages,
      selfMessageOpen,
      friendMessageOpen,
      username,
      loading,
    } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <PageHeader username={username} />
        <button
          className="btn btn-primary"
          onClick={() => this.openMessageForm("self")}
        >
          {selfMessageOpen ? "Close Self Message" : "Send Self Message"}
        </button>
        {selfMessageOpen && <MessageForm type="self" />}
        <h3>Self Messages</h3>
        {selfMessages.map((m) => (
          <React.Fragment>
            <div className="row">
              <div className="col">
                <div key={m._id + String(m.time)}>
                  <h6>{m.title ? m.title : "<no subject>"}</h6>
                  <p>{m.text}</p>
                </div>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => this.handleDeleteMessage(m)}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr />
          </React.Fragment>
        ))}
        <hr />
        <button
          className="btn btn-primary"
          onClick={() => this.openMessageForm("friend")}
        >
          {friendMessageOpen ? "Close Friend Message" : "Send Friend Message"}
        </button>
        {friendMessageOpen && <MessageForm type="friend" friends={friends} />}
        <h3>Friend Messages</h3>
        {friendMessages.map((m) => (
          <div key={m._id + String(m.time)}>
            <h6>{m.title + " - " + m.fromName}</h6>
            <p>{m.text}</p>
            <hr />
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default Messages;
