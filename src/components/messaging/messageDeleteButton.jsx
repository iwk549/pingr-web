import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { IconContext } from "react-icons";

const MessageDeleteButton = ({ message, onDeleteMessage }) => {
  return (
    <IconContext.Provider value={{ className: "icon-white" }}>
      <div className="col-sm-auto">
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDeleteMessage(message)}
        >
          <MdDeleteForever />
        </button>
      </div>
    </IconContext.Provider>
  );
};

export default MessageDeleteButton;
