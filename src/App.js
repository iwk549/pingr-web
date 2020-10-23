import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Cookies from "js-cookie";
import Messages from "./components/messaging/messages";
import Friends from "./components/friends/friends";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = Cookies.get("loggedIn");
    this.setState({ user });
  }

  render() {
    return (
      <div className="main-format">
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
              <ProtectedRoute exact path="/messages" component={Messages} />
              <ProtectedRoute exact path="/friends" component={Friends} />
              <Redirect to="/messages" />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
