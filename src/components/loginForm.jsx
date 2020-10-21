import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { loginUser } from "../services/authService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    token: null,
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.email = data.email.toLowerCase();

    const response = await loginUser(data);
    if (response.status === 200) {
      localStorage.setItem("loggedIn", "true");
      window.location = "/";
    } else toast(response.data);
  };

  render() {
    return (
      <div>
        <h1>{"Login"}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "autofocus")}
          {this.renderInput("password", "Password", "", "password")}

          {this.renderValidatedButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;