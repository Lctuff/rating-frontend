import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Posts from "./Components/posts";
import PostPage from "./Components/postPage";
import NavBar from "./Components/navBar";
import RegisterForm from "./Components/registerForm";
import LoginForm from "./Components/loginForm";
import Logout from "./Components/logout";
import NotFound from "./Components/notFound";
import { getCurrentUser } from "./services/authService";
import PostForm from "./Components/postForm";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Components/common/protectedRoute";
import User from "./Components/user";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user: user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <NavBar user={user} />
        <ToastContainer />
        <br />
        <main className="container">
          <Switch>
            <Route
              path="/posts/:id"
              component={(props) => <PostPage {...props} user={user} />}
            />

            <Route
              path="/post/edit/:id"
              render={(props) => <PostForm {...props} user={user} />}
            />
            <Route
              path="/posts"
              render={(props) => <Posts {...props} user={user} />}
            />
            <ProtectedRoute path="/profile" component={User} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/posts" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
