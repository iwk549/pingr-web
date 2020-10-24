import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMessages } from "../../services/messageService";
import { confirmFriend, deleteFriend } from "../../services/friendService";
import PageHeader from "../common/pageHeader";
import FriendForm from "./friendForm";
import Loading from "../common/loading";
import FriendRequest from "./friendRequest";
import { BsPersonPlusFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";

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

  handleMessageFormOpen = (friend) => {
    this.setState({
      messageFormOpen:
        this.state.messageFormOpen === friend._id ? null : friend._id,
    });
  };

  handleViewMessages = (friend) => {
    console.log(friend);
    this.props.location.pathname = "/messages";
  };

  handleAcceptFriend = async (friend) => {
    const response = await confirmFriend(friend);
    if (response.status === 200) window.location = "/friends";
    else toast.error(response.data);
  };

  handleDeleteFriend = async (friend) => {
    const ok = window.confirm(
      `Are you sure you want to remove ${friend.username}?`
    );
    if (ok) {
      const response = await deleteFriend(friend);
      if (response.status === 200) window.location = "/friends";
      else toast.error(response.data);
    }
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
      <IconContext.Provider value={{ className: "icon-white" }}>
        <React.Fragment>
          <PageHeader username={username} />
          <button
            className="btn btn-block btn-primary"
            onClick={() =>
              this.setState({ addFriendOpen: addFriendOpen ? false : true })
            }
          >
            {addFriendOpen ? <MdClose /> : <BsPersonPlusFill />}
          </button>
          {addFriendOpen && <FriendForm />}
          <br />
          <div className="row">
            <div className="col">
              <h5>Friends</h5>
              <br />
              {friends.map((f) => (
                <FriendRequest
                  type="friend"
                  friend={f}
                  onDeleteFriend={this.handleDeleteFriend}
                  messageFormOpen={messageFormOpen}
                  onMessageFormOpen={this.handleMessageFormOpen}
                  onViewMessages={this.handleViewMessages}
                />
              ))}
            </div>
            <div className="col">
              <React.Fragment>
                <h5>Pending Requests</h5>
                <br />
                {friendRequests.map((f) => (
                  <FriendRequest
                    type="pending"
                    friend={f}
                    onAcceptFriend={this.handleAcceptFriend}
                    onDeleteFriend={this.handleDeleteFriend}
                  />
                ))}
                {requestedFriends.map((f) => (
                  <FriendRequest
                    type="requested"
                    friend={f}
                    onDeleteFriend={this.handleDeleteFriend}
                  />
                ))}
              </React.Fragment>
            </div>
          </div>
        </React.Fragment>
      </IconContext.Provider>
    );
  }
}

export default Friends;
