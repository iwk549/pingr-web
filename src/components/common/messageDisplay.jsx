import React from "react";

const MessageDisplay = ({ message }) => {
  return (
    <div className="col">
      <div>
        <h6>{message.title ? message.title : "<no subject>"}</h6>
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageDisplay;
