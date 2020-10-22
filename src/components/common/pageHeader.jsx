import React from "react";

const PageHeader = ({ username }) => {
  return (
    <div>
      <br />
      {username && <h2>{`Welcome ${username}`}</h2>}
      <br />
    </div>
  );
};

export default PageHeader;
