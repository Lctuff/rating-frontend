import React, { Component } from "react";

import { getPost } from "../services/postService";

class PostPage extends Component {
  state = {
    data: {
      title: "",
      description: "",
      review: "",
      category: "",
      img: "",
      rating: "",
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
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div className="row">
        <div>
          <img src={data.img} className="rounded float-start" />
          <h1>
            {data.title} {data.rating}/5
          </h1>
          <h4>{data.category}</h4>
          <h2>{data.description}</h2>
        </div>
        <div>
          <h3>{data.review}</h3>
        </div>
      </div>
    );
  }
}

export default PostPage;
