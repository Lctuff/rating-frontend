import React from "react";

import Form from "./common/form";
import Joi from "joi-browser";
import { getPost, savePost, uploadImg } from "../services/postService";

class PostForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
      review: "",
      category: "",
      img: "",
      rating: "",
    },
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    review: Joi.string().required().label("Review"),
    img: Joi.string().label("Image"),
    rating: Joi.number().required().max(5).min(1).label("Rating"),
    category: Joi.string().required().label("Category"),
  };

  async populatePost() {
    try {
      const postId = this.props.match.params.id;
      if (postId === "new") return;

      const { data: post } = await getPost(postId);

      this.setState({ data: this.mapToViewModel(post) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populatePost();
  }

  mapToViewModel(post) {
    return {
      _id: post._id,
      title: post.title,
      description: post.description,
      review: post.review,
      img: post.img,
      category: post.category,
      rating: post.rating,
    };
  }

  doSubmit = async () => {
    await savePost(this.state.data);

    this.props.history.push("/posts");
  };

  uploadHandler = async (event) => {
    var imgdata = new FormData();

    imgdata.append("files", event.target.files[0]);

    const link = await uploadImg(imgdata);

    const data = { ...this.state.data };
    data[event.target.name] = link.data;
    this.setState({ data });
  };

  render() {
    return (
      <div>
        <h1 className="mb-3">Post Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="img">Image</label> <br />
          <input
            className="form-control"
            type="file"
            id="img"
            name="img"
            onChange={this.uploadHandler}
          />
          {this.renderInput("title", "Title")}
          {this.renderInput("description", "Description")}
          {this.renderInput("review", "Review")}
          {this.renderInput("category", "Category")}
          {this.renderInput("rating", "Rating", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default PostForm;
