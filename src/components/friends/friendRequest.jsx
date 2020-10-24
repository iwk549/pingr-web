import React, { Component } from "react";
import MessageForm from "./../messaging/messageForm";
import { MdSend, MdClose, MdDeleteForever, MdCheck } from "react-icons/md";
// import { RiMailOpenLine } from "react-icons/ri";
import { IconContext } from "react-icons";

const FriendRequest = ({
  friend,
  onDeleteFriend,
  messageFormOpen,
  onMessageFormOpen,
  //   onViewMessages,
  onAcceptFriend,
  type,
}) => {
  return (
    <IconContext.Provider value={{ className: "icon-white" }}>
      <React.Fragment key={friend.username}>
        <div className="row">
          <div className="col">
            {messageFormOpen === friend._id ? (
              <b>{friend.username}</b>
            ) : (
              friend.username
            )}
          </div>
          {type === "friend" && (
            <div className="col">
              <button
                className="btn btn-sm btn-info"
                onClick={() => onMessageFormOpen(friend)}
              >
                {messageFormOpen === friend._id ? <MdClose /> : <MdSend />}
              </button>
            </div>
          )}
          {type === "pending" && (
            <div className="col">
              <button
                className="btn btn-sm btn-success"
                onClick={() => onAcceptFriend(friend)}
              >
                <MdCheck />
              </button>
            </div>
          )}
          {/* <IconContext.Provider value={{ className: "icon-dark" }}>
            <div className="col">
              <button
                className="btn btn-sm btn-light"
                onClick={() => onViewMessages(friend)}
              >
                <RiMailOpenLine />
              </button>
            </div>
          </IconContext.Provider> */}
          <div className="col">
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDeleteFriend(friend)}
            >
              <MdDeleteForever />
            </button>
          </div>
          {messageFormOpen === friend._id && (
            <MessageForm type="friend" sendTo={friend} />
          )}
        </div>
        <hr />
      </React.Fragment>
    </IconContext.Provider>
  );
};

export default FriendRequest;
