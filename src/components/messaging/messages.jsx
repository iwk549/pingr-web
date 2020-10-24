import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { getMessages, deleteMessage } from "../../services/messageService";
import MessageForm from "./messageForm";
import Loading from "../common/loading";
import PageHeader from "../common/pageHeader";
import FullMessage from "./fullMessage";
import { IconContext } from "react-icons";
import { BiArrowToTop } from "react-icons/bi";
import { MdExpandMore, MdReply, MdClose } from "react-icons/md";
import { TiMessage, TiMessages } from "react-icons/ti";
import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";

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
    loading: false,
    sendTo: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await getMessages();
    if (response.status === 200) {
      let selfMessages = [];
      let friendMessages = [];
      let sentMessages = [];
      response.data.messages.forEach((m) => {
        m.dateTime = format(fromUnixTime(m.time / 1000), "yyyy-MM-dd [HH:mm]");
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
        sendTo: null,
      });
    else
      this.setState({
        friendMessageOpen: this.state.friendMessageOpen ? false : true,
        selfMessageOpen: false,
        sendTo: null,
      });
  }

  handleReplyMessage(friend) {
    this.setState({
      sendTo:
        this.state.sendTo && this.state.sendTo._id === friend._id
          ? null
          : friend,
      friendMessageOpen: false,
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
      sendTo,
    } = this.state;
    const [friends, selfMessages] = this.getPageData();
    return loading ? (
      <Loading />
    ) : (
      <IconContext.Provider value={{ className: "icon-white" }}>
        <React.Fragment>
          <PageHeader username={username} />
          <div className="row">
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={() => this.openMessageForm("self")}
              >
                {selfMessageOpen ? (
                  <p>
                    <MdClose /> <TiMessage />
                  </p>
                ) : (
                  <p>
                    <TiMessage /> Self
                  </p>
                )}
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={() => this.openMessageForm("friend")}
              >
                {friendMessageOpen ? (
                  <p>
                    <MdClose /> <TiMessages />
                  </p>
                ) : (
                  <p>
                    <TiMessages /> Friend
                  </p>
                )}
              </button>
            </div>
          </div>
          {selfMessageOpen && <MessageForm type="self" />}
          {friendMessageOpen && <MessageForm type="friend" friends={friends} />}
          <br />
          <div className="row">
            <div className="col">
              <h3>Self Messages</h3>
            </div>
            <div className="col">
              <button
                className="btn btn-sm btn-dark"
                onClick={() =>
                  this.setState({
                    viewSelfMessages: viewSelfMessages ? false : true,
                  })
                }
              >
                {viewSelfMessages ? <BiArrowToTop /> : <MdExpandMore />}
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
          <div className="main-separator" />
          <h3>Friend Messages</h3>
          {friends.map((f) => (
            <React.Fragment key={f._id}>
              <div className="row">
                <div className="col">
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
                </div>
                <div className="col">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => this.handleReplyMessage(f)}
                  >
                    {sendTo && sendTo._id === f._id ? <MdClose /> : <MdReply />}
                  </button>
                </div>
                <div className="col">
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() =>
                      this.setState({
                        selectedFriend: selectedFriend === f._id ? null : f._id,
                      })
                    }
                  >
                    {selectedFriend === f._id ? (
                      <BiArrowToTop />
                    ) : (
                      <MdExpandMore />
                    )}
                  </button>
                </div>
              </div>
              {sendTo && sendTo._id === f._id && (
                <MessageForm
                  type="friend"
                  friends={friends}
                  sendTo={sendTo}
                  rows={2}
                />
              )}
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
      </IconContext.Provider>
    );
  }
}

export default Messages;
