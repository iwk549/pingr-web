import React from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { toast } from "react-toastify";
import { BsPersonPlusFill } from "react-icons/bs";
import { IconContext } from "react-icons";

const NavBar = ({ user, userInfo }) => {
  const handleLogout = async () => {
    const response = await logoutUser();
    if (!response.status === 200) return toast.error(response.data);
    window.location = "/login";
  };

  let friendRequestCount = 0;
  if (userInfo && userInfo.friends)
    userInfo.friends.forEach((f) => {
      if (!f.confirmed && !f.requestor) friendRequestCount++;
    });

  return (
    <IconContext.Provider value={{ className: "icon-white" }}>
      <nav className="navbar nav-tabs sticky-top">
        {!user && (
          <React.Fragment>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <NavLink className="nav-link" to="/messages">
              Messages
            </NavLink>
            <NavLink className="nav-link" to="/friends">
              Friends
              {friendRequestCount > 0 && (
                <div className="text-center">
                  <BsPersonPlusFill />
                </div>
              )}
            </NavLink>
          </React.Fragment>
        )}
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
        {user && (
          <button className="btn btn-danger" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </nav>
    </IconContext.Provider>
  );
};

export default NavBar;
