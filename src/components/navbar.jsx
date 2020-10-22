import React from "react";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../services/authService";
import { toast } from "react-toastify";

const NavBar = ({ user }) => {
  const handleLogout = async () => {
    const response = await logoutUser();
    if (!response.status === 200) return toast.error(response.data);
    window.location = "/login";
  };
  return (
    <nav className="navbar nav-tabs">
      {!user && (
        <React.Fragment>
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
        </React.Fragment>
      )}
      {user && (
        <React.Fragment>
          <NavLink className="nav-item nav-link" to="/messages">
            Messages
          </NavLink>
          <NavLink className="nav-item nav-link" to="/friends">
            Friends
          </NavLink>
          <button className="btn btn-danger" onClick={handleLogout}>
            Log Out
          </button>
        </React.Fragment>
      )}
    </nav>
  );
};

export default NavBar;
