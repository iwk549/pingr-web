import React from "react";
import MessageDisplay from "./messageDisplay";
import MessageDeleteButton from "./messageDeleteButton";

const FullMessage = ({ message, onMessageDelete }) => {
  return (
    <React.Fragment key={message._id + String(message.time)}>
      <div className="row">
        <MessageDisplay message={message} />
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
