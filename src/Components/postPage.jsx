import React, { Component } from "react";

import { getPost, deletePost } from "../services/postService";
import Stars from "./common/stars";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

  handleDelete = async (data) => {
    const originalPost = this.state.data;
    const post = originalPost;

    this.setState({ data: post });

    try {
      await deletePost(data._id);

      this.props.history.push("/posts");
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ data: originalPost });
    }
  };

  render() {
    const { data } = this.state;

    return (
      <div className="row">
        <div className="col" style={{ height: 300 }}>
          <img
            src={data.img}
            className="me-2 rounded float-start h-100"
            alt=""
          />
          <h1>{data.title}</h1>
          <Stars rating={parseInt(data.rating)} />
          <h4>{data.category}</h4>
          <h2>{data.description}</h2>
        </div>
        <div className="col-2">
          <Link className="btn btn-primary" to={`/post/edit/${data._id}`}>
            Edit Post
          </Link>
          <br />
          <br />
          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("Delete Post?")) {
                this.handleDelete(data);
              }
            }}
          >
            Delete Post
          </button>
        </div>
        <div className="border-top mt-4">
          <h3>{data.review}</h3>
        </div>
      </div>
    );
  }
}

export default PostPage;
