import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="text-center">
      <br />
      <br />
      <br />
      <Spinner animation="grow" variant="info" />
    </div>
  );
};

export default Loading;
