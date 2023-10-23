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

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <NavBar user={user} />
        <br />
        <main className="container">
          <Switch>
            <Route path="/posts/:id" component={PostPage} />
            <Route path="/post/edit/:id" component={PostForm} />
            <Route path="/posts" component={Posts} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/posts" />
            <Redirect to="not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
