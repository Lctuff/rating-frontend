import React from "react";

import { getCurrentUser } from "../services/authService";
import { deleteUser, saveUser } from "../services/userService";
import { toast } from "react-toastify";
import Form from "./common/form";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";
import { uploadImg } from "../services/postService";

class User extends Form {
  state = {
    data: {
      name: "",
      email: "",
      profileImg: "",
      newPassword: "",
      confirmPassword: "",
    },
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    newPassword: Joi.string().label("New Password").allow(""),
    confirmPassword: Joi.string()
      .allow("")
      .valid(Joi.ref("newPassword"))
      .label("Confirm Password")
      .options({ language: { any: { allowOnly: "must match New Password" } } }),
    profileImg: Joi.string().required().label("Profile Image"),
  };

  async populateUser() {
    try {
      const user = await getCurrentUser();

      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateUser();
  }

  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      profileImg: user.profileImg,
      newPassword: "",
      confirmPassword: "",
    };
  }

  uploadHandler = async (event) => {
    var imgdata = new FormData();

    imgdata.append("files", event.target.files[0]);

    const link = await uploadImg(imgdata);

    const data = { ...this.state.data };
    data[event.target.name] = link.data;
    this.setState({ data });
  };

  handleDelete = async (data) => {
    try {
      await deleteUser(data);

      this.props.history.push("/logout");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This user has already been deleted");
    }
  };

  doSubmit = async () => {
    try {
      const password = prompt(
        "To Confirm Changes Enter Your Password(After Changes you will need to log back in)"
      );
      if (password === null) return;
      const { data } = this.state;
      if (data.confirmPassword === "") {
        data["confirmPassword"] = password;
      }
      console.log();

      const user = { password: password, ...data };

      await saveUser(user);

      const { state } = this.props.location;

      window.location = state ? state.from.pathname : "/logout";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data } = this.state;

    if (!getCurrentUser) {
      return (
        <Redirect
          to={{ pathname: "/login", state: { from: this.props.location } }}
        />
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="img">
            <img
              src={data.profileImg}
              style={{ width: 200, height: 200 }}
              alt=""
            />
            Profile Image
          </label>
          <br />
          <input
            className="form-control"
            type="file"
            id="img"
            name="img"
            onChange={this.uploadHandler}
          />
          <br />
          {this.renderInput("name", "Username")}
          <br />
          Change Email
          <div className="border-top">
            <br />
            {this.renderInput("email", "Email", "")}
          </div>
          <br />
          Change Password
          <div className="border-top">
            <br />
            {this.renderInput("newPassword", "New Password")}
            <br />
            {this.renderInput("confirmPassword", "Confirm Password")}
          </div>
          {this.renderButton("Save Changes")}
        </form>
        <br />
        <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm("Are You Sure This Will Delete All Your Data")) {
              this.handleDelete(getCurrentUser());
            }
          }}
        >
          Delete User
        </button>
      </div>
    );
  }
}

export default User;
