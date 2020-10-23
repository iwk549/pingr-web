import React from "react";

const MessageDisplay = ({ message, from }) => {
  return (
    <div className="col">
      <div>
        <p className={from === "me" ? "text-right" : ""}>{message.text}</p>
      </div>
    </div>
  );
};

export default MessageDisplay;
