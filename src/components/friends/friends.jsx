import React, { Component } from "react";
import { getMessages } from "../../services/messageService";
import PageHeader from "../common/pageHeader";
import FriendForm from "./friendForm";

class Friends extends Component {
  state = {
    username: "",
    friends: [],
    requestedFriends: [],
    friendRequests: [],
    addFriendOpen: false,
  };

  async componentDidMount() {
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
  }

  handleAcceptFriend = async (friend) => {
    console.log(friend);
  };

  handleRejectFriend = async (friend) => {
    console.log(friend);
  };

  render() {
    const {
      username,
      friends,
      requestedFriends,
      friendRequests,
      addFriendOpen,
    } = this.state;
    return (
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
              <React.Fragment>
                <div className="row" key={f.username}>
                  <div className="col">{f.username}</div>
                  <div className="col">
                    <button className="btn btn-sm btn-primary">Send</button>
                    <br />
                    <button className="btn btn-sm btn-light">View</button>
                  </div>
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
          <div className="col">
            <React.Fragment>
              <h5>Pending Requests</h5>
              {requestedFriends.map((f) => (
                <div key={f.username}>{f.username}</div>
              ))}
              {friendRequests.map((f) => (
                <div className="row" key={f.username}>
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
                      onClick={() => this.handleRejectFriend(f)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </React.Fragment>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Friends;
