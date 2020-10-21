import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { registerNewUser } from "../services/userService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {},
    apiError: "",
  };

  schema = {
    username: Joi.string().required().label("Username"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(8).label("Password"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    const response = await registerNewUser(data);
    if (response.status === 200) {
      localStorage.setItem("loggedIn", "true");
      window.location = "/";
    } else toast.error(response.data);
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "autofocus")}
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "", "password")}
          {this.renderValidatedButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
