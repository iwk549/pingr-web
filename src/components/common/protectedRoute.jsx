import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  adminOnly,
  captainOnly,
  noReferee,
  noPlayer,
  ...rest
}) => {
  const user = Cookies.get("loggedIn");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user)
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        else return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
