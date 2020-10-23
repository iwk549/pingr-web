import React from "react";

const MessageDeleteButton = ({ message, onDeleteMessage }) => {
  return (
    <div className="col-2">
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
