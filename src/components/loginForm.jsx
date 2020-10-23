import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().min(3).max(30).label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.username = data.username.toLowerCase();

    const response = await loginUser(data);
    if (response.status === 200) {
      window.location = "/messages";
    } else toast(response.data);
  };

  render() {
    if (Cookies.get("loggedIn")) return <Redirect to="/messages" />;
    return (
      <div>
        <h1>{"Login"}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "autofocus")}
          {this.renderInput("password", "Password", "", "password")}

          {this.renderValidatedButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
