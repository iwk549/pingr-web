import React from "react";

const MessageDeleteButton = ({ message, onDeleteMessage }) => {
  return (
    <div className="col-sm-auto">
      <button
        className="btn btn-sm btn-danger"
        onClick={() => onDeleteMessage(message)}
      >
        Delete
      </button>
    </div>
  );
};

export default MessageDeleteButton;
