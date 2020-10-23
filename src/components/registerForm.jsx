import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { registerNewUser } from "../services/userService";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    apiError: "",
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(8).label("Password"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.username = data.username.toLowerCase();
    const response = await registerNewUser(data);
    if (response.status === 200) {
      window.location = "/messages";
    } else toast.error(response.data);
  };

  render() {
    if (Cookies.get("loggedIn")) return <Redirect to="/messages" />;
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "autofocus")}
          {this.renderInput("password", "Password", "", "password")}
          {this.renderValidatedButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
