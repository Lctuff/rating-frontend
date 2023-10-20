import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Posts from "./Components/posts";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <main className="container">
          <Switch>
            <Route path="/posts" component={Posts} />
            <Redirect from="/" exact to="/posts" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
