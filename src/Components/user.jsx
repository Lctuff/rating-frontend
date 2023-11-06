import React, { Component } from "react";

import { getCurrentUser } from "../services/authService";

class User extends Component {
  render() {
    return (
      <div>
        <h1>{getCurrentUser().name}</h1>
        <p>{getCurrentUser().email}</p>
      </div>
    );
  }
}

export default User;
