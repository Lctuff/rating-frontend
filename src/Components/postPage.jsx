import React, { Component } from "react";

import { getPost } from "../services/postService";
import Stars from "./common/stars";

class PostPage extends Component {
  state = {
    data: {
      title: "",
      description: "",
      review: "",
      category: "",
      img: "",
      rating: "",
      comments: [],
    },
  };

  async populatePost() {
    try {
      const postId = this.props.match.params.id;

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
      comments: post.comments,
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div className="row">
        <div style={{ height: 300 }}>
          <img src={data.img} className="me-2 rounded float-start h-100" />
          <h1>{data.title}</h1>
          <Stars rating={parseInt(data.rating)} />
          <h4>{data.category}</h4>
          <h2>{data.description}</h2>
        </div>
        <div className="border-top mt-4">
          <h3>{data.review}</h3>
        </div>
      </div>
    );
  }
}

export default PostPage;
