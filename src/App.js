import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "./logo.svg";
import "./App.css";
import { checkLoginStatus } from "./services/authService";
import Home from "./components/home";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navbar";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = localStorage.getItem("loggedIn");
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <ToastContainer
            position="bottom-right"
            autoClose={4000}
            closeOnClick
            pauseOnHover
            pauseOnFocusLoss
          />
          <NavBar user={this.state.user} />
          <main className="container">
            <div className="content"></div>
            <Switch>
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/" component={Home} />
            </Switch>
          </main>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
