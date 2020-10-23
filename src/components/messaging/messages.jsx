import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { getMessages, deleteMessage } from "../../services/messageService";
import MessageForm from "./messageForm";
import Loading from "../common/loading";
import PageHeader from "../common/pageHeader";
import FullMessage from "./fullMessage";

class Messages extends Component {
  state = {
    _id: "",
    username: "",
    selfMessages: [],
    friendMessages: {},
    friends: [],
    selfMessageOpen: false,
    viewSelfMessages: true,
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
      let sentMessages = [];
      response.data.messages.forEach((m) => {
        if (m.from === response.data._id && m.to === response.data._id)
          selfMessages.push(m);
        else if (m.from !== response.data._id) friendMessages.push(m);
        else sentMessages.push(m);
      });

      let friends = [];
      friendMessages = _.groupBy(friendMessages, "from");
      response.data.friends.forEach((f) => {
        if (f.confirmed) {
          friends.push(f);
          sentMessages.forEach((m) => {
            if (m.to === f._id)
              friendMessages[f._id]
                ? friendMessages[f._id].push(m)
                : (friendMessages[f._id] = [m]);
          });
          friendMessages[f._id] = _.orderBy(
            friendMessages[f._id],
            "time",
            "desc"
          );
        }
      });
      this.setState({
        _id: response.data._id,
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
    let { friends, friendOrder, friendSort, selfMessages } = this.state;
    friends = _.orderBy(friends, friendSort, friendOrder);
    selfMessages = _.orderBy(selfMessages, "time", "desc");
    return [friends, selfMessages];
  };

  render() {
    const {
      friendMessages,
      selfMessageOpen,
      friendMessageOpen,
      _id,
      username,
      selectedFriend,
      viewSelfMessages,
      loading,
    } = this.state;
    const [friends, selfMessages] = this.getPageData();
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
        <div className="row">
          <div className="col">
            <h3>Self Messages</h3>
          </div>
          <div className="col-2">
            <button
              className="btn btn-sm btn-dark"
              onClick={() =>
                this.setState({
                  viewSelfMessages: viewSelfMessages ? false : true,
                })
              }
            >
              {viewSelfMessages ? "Close" : "Open"}
            </button>
          </div>
        </div>
        {viewSelfMessages &&
          (selfMessages.length > 0 ? (
            selfMessages.map((m) => (
              <FullMessage
                message={m}
                onMessageDelete={this.handleDeleteMessage}
              />
            ))
          ) : (
            <p>No self messages</p>
          ))}

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
              (friendMessages[f._id].length > 0 ? (
                friendMessages[f._id].map((m) => (
                  <FullMessage
                    _id={_id}
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
