import React, { Component } from "react";

import { getPost, deletePost } from "../services/postService";
import Stars from "./common/stars";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { saveComment } from "../services/commentService";
import { map } from "lodash";

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

    comment: {
      text: "",
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

  handleCommentSubmit = async (e) => {
    e.preventDefault();

    const user = this.props.user._id;

    const req = {
      text: this.state.comment.text,
      user: user,
    };

    const { data: comment } = await saveComment(this.state.data, req);
    const data = { ...this.state.data };

    const comments = [comment, ...this.state.data.comments];
    data["comments"] = comments;
    this.setState({ data: data });
  };
  handleCommentChange = async (comment) => {
    this.setState({ comment: { text: comment } });
  };

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
        <div className="border-top">
          <form onSubmit={this.handleCommentSubmit}>
            <input
              type="text"
              name="text"
              className="form-control my-3"
              placeholder="Comment..."
              value={this.state.comment.text}
              onChange={(e) => this.handleCommentChange(e.currentTarget.value)}
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>

          <table className="table">
            <tbody>
              {data.comments.map((comment) => (
                <tr key={comment._id}>
                  <td>
                    <div className="row">
                      <div className="col-1">
                        <img
                          src={comment.user.profileImg}
                          alt=""
                          style={{ width: 100 }}
                        />{" "}
                      </div>
                      <div className="col">
                        <br />
                        {comment.user.name} <br />
                        {comment.text}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default PostPage;
