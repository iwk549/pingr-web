import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { getMessages, deleteMessage } from "../../services/messageService";
import MessageForm from "./messageForm";
import Loading from "../common/loading";
import PageHeader from "../common/pageHeader";
import MessageDeleteButton from "./../common/messageDeleteButton";
import MessageDisplay from "./../common/messageDisplay";
import FullMessage from "./../common/fullMessage";

class Messages extends Component {
  state = {
    username: "",
    selfMessages: [],
    friendMessages: {},
    friends: [],
    selfMessageOpen: false,
    viewSelfMessages: false,
    friendMessageOpen: false,
    selectedFriend: null,
    friendOrder: "asc",
    friendSort: "username",
    friendSearch: "",
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
      friendMessages = _.groupBy(friendMessages, "from");
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

  getPageData = () => {
    let { friends, friendOrder, friendSort } = this.state;
    friends = _.orderBy(friends, friendSort, friendOrder);
    return friends;
  };

  render() {
    const {
      selfMessages,
      friendMessages,
      selfMessageOpen,
      viewSelfMessages,
      friendMessageOpen,
      username,
      selectedFriend,
      loading,
    } = this.state;
    const friends = this.getPageData();
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
        <h3
          className="clickable"
          onClick={() =>
            this.setState({ viewSelfMessages: viewSelfMessages ? false : true })
          }
        >
          {viewSelfMessages ? "Close Self Messages" : "View Self Messages"}
        </h3>
        {viewSelfMessages &&
          selfMessages.map((m) => (
            <FullMessage
              message={m}
              onMessageDelete={this.handleDeleteMessage}
            />
          ))}
        <br />
        <div style={{ borderBottom: "1px solid" }} className="separator" />
        <br />
        <button
          className="btn btn-primary"
          onClick={() => this.openMessageForm("friend")}
        >
          {friendMessageOpen ? "Close Friend Message" : "Send Friend Message"}
        </button>
        {friendMessageOpen && <MessageForm type="friend" friends={friends} />}
        <h3>Friend Messages</h3>
        {friends.map((f) => (
          <React.Fragment key={f._id}>
            <h5
              className="clickable"
              onClick={() =>
                this.setState({
                  selectedFriend: selectedFriend === f._id ? null : f._id,
                })
              }
            >
              {f.username}
            </h5>
            {selectedFriend === f._id &&
              (friendMessages[f._id] ? (
                friendMessages[f._id].map((m) => (
                  <FullMessage
                    message={m}
                    onMessageDelete={this.handleDeleteMessage}
                  />
                ))
              ) : (
                <div>No Messages</div>
              ))}
            <hr />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }
}

export default Messages;
