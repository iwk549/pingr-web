import React, { Component } from "react";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { getMessages } from "./services/messageService";
import Cookies from "js-cookie";
import Messages from "./components/messaging/messages";
import Friends from "./components/friends/friends";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/common/protectedRoute";
import About from "./components/about";

class App extends Component {
  state = {};

  async componentDidMount() {
    const user = Cookies.get("loggedIn");
    if (user) {
      const response = await getMessages();
      if (response.status === 200) this.setState({ userInfo: response.data });
    }
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
          <NavBar user={this.state.user} userInfo={this.state.userInfo} />
          <main className="container">
            <div className="content"></div>
            <Switch>
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/login" component={LoginForm} />
              <ProtectedRoute
                exact
                path="/messages"
                component={Messages}
                userInfo={this.state.userInfo}
              />
              <ProtectedRoute
                exact
                path="/friends"
                component={Friends}
                userInfo={this.state.userInfo}
              />
              <Route exact path="/about" component={About} />
              <Redirect to="/messages" />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
