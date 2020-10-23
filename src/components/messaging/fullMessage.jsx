import React from "react";
import MessageDisplay from "./messageDisplay";
import MessageDeleteButton from "./messageDeleteButton";

const FullMessage = ({ message, onMessageDelete, _id }) => {
  return (
    <React.Fragment key={message._id + String(message.time)}>
      <div className="row">
        {_id === message.from && <div className="col" />}
        <MessageDisplay
          message={message}
          from={_id === message.from ? "me" : ""}
        />
        <MessageDeleteButton
          message={message}
          onDeleteMessage={onMessageDelete}
        />
      </div>
      <hr className="separator" />
    </React.Fragment>
  );
};

export default FullMessage;
