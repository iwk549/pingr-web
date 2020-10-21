import React, { Component, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getUserInfo } from "../services/userService";
import { loginUser } from "../services/authService";
import LoginForm from "./loginForm";

const Home = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  const getStuff = async () => {
    console.log("getstuff");
  };
  useEffect(() => {
    getStuff();
  }, []);

  const handleLogout = () => {
    removeCookie("jwt");
  };

  return (
    <React.Fragment>
      <div>Home</div>
    </React.Fragment>
  );
};

export default Home;
