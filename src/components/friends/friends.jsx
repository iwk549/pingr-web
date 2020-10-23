import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMessages } from "../../services/messageService";
import { confirmFriend, deleteFriend } from "../../services/friendService";
import PageHeader from "../common/pageHeader";
import FriendForm from "./friendForm";
import MessageForm from "./../messaging/messageForm";
import Loading from "../common/loading";

class Friends extends Component {
  state = {
    username: "",
    friends: [],
    requestedFriends: [],
    friendRequests: [],
    addFriendOpen: false,
    messageFormOpen: null,
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const response = await getMessages();
    if (response.status === 200) {
      let friends = [];
      let requestedFriends = [];
      let friendRequests = [];
      response.data.friends.forEach((f) => {
        if (f.confirmed) friends.push(f);
        else if (f.requestor) requestedFriends.push(f);
        else friendRequests.push(f);
      });
      this.setState({
        username: response.data.username,
        friends,
        requestedFriends,
        friendRequests,
      });
    }
    this.setState({ loading: false });
  }

  handleAcceptFriend = async (friend) => {
    const response = await confirmFriend(friend);
    if (response.status === 200) window.location = "/friends";
    else toast.error(response.data);
  };

  handleDeleteFriend = async (friend) => {
    const response = await deleteFriend(friend);
    if (response.status === 200) window.location = "/friends";
    else toast.error(response.data);
  };

  render() {
    const {
      username,
      friends,
      requestedFriends,
      friendRequests,
      addFriendOpen,
      messageFormOpen,
      loading,
    } = this.state;
    return loading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <PageHeader username={username} />
        <button
          className="btn btn-block btn-primary"
          onClick={() =>
            this.setState({ addFriendOpen: addFriendOpen ? false : true })
          }
        >
          {addFriendOpen ? "Close Friend Add Form" : "Add Friend"}
        </button>
        {addFriendOpen && <FriendForm />}
        <br />
        <div className="row">
          <div className="col">
            <h5>Friends</h5>
            <br />
            {friends.map((f) => (
              <React.Fragment key={f.username}>
                <div className="row">
                  <div className="col">
                    {messageFormOpen === f._id ? (
                      <b>{f.username}</b>
                    ) : (
                      f.username
                    )}
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() =>
                        this.setState({
                          messageFormOpen:
                            messageFormOpen === f._id ? null : f._id,
                        })
                      }
                    >
                      {messageFormOpen === f._id ? "Close" : "Send"}
                    </button>
                    <br />
                    <button className="btn btn-sm btn-light">View</button>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.handleDeleteFriend(f)}
                    >
                      Remove Friend
                    </button>
                  </div>
                  {messageFormOpen === f._id && (
                    <MessageForm type="friend" sendTo={f} />
                  )}
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
          <div className="col">
            <React.Fragment>
              <h5>Pending Requests</h5>
              <br />
              {friendRequests.map((f) => (
                <React.Fragment key={f.username}>
                  <div className="row">
                    <div className="col">{f.username}</div>
                    <div className="col">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => this.handleAcceptFriend(f)}
                      >
                        Accept
                      </button>
                      <br />
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.handleDeleteFriend(f)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
              {requestedFriends.map((f) => (
                <React.Fragment key={f.username}>
                  <div className="row">
                    <div className="col">{f.username}</div>
                    <div className="col">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.handleDeleteFriend(f)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </React.Fragment>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
