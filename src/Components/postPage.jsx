import React, { Component } from "react";

import { getPost, deletePost } from "../services/postService";
import Stars from "./common/stars";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { deleteComment, saveComment } from "../services/commentService";

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
      user: {},
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
      user: post.user,
    };
  }

  handleCommentSubmit = async (e) => {
    e.preventDefault();

    const user = this.props.user;

    const req = {
      text: this.state.comment.text,
      user: user._id,
    };

    const { data: comment } = await saveComment(this.state.data, req);
    const data = { ...this.state.data };

    comment["user"] = user;

    const comments = [comment, ...this.state.data.comments];
    data["comments"] = comments;
    this.setState({ data: data });
  };

  handleCommentEdit = async (comment) => {
    const text = prompt("Please Edit comment");

    const req = {
      _id: comment._id,
      text: text,
      user: comment.user,
    };

    const originalComments = this.state.data.comments;
    const filteredComments = originalComments.filter(
      (c) => c._id !== comment._id
    );

    const comments = [req, ...filteredComments];

    const data = { ...this.state.data };
    data["comments"] = comments;

    console.log("hello world");

    this.setState({ data: data });
    try {
      const result = await saveComment(this.state.data, req);
      console.log(result);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("The comment did not save");
      this.setState({ tasks: originalComments });
    }
  };

  handleCommentDelete = async (comment) => {
    const originalComments = this.state.data.comments;
    const comments = originalComments.filter((c) => c._id !== comment._id);

    const data = { ...this.state.data };
    data["comments"] = comments;

    this.setState({ data: data });

    try {
      await deleteComment(comment._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This comment has already been deleted");

      data["comments"] = originalComments;

      this.setState({ data: data });
    }
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
        toast.error("This post has already been deleted");
      this.setState({ data: originalPost });
    }
  };

  render() {
    const { data } = this.state;
    const { user } = this.props;

    return (
      <div className="row">
        <div className="col" style={{ height: 300 }}>
          <img
            src={data.img}
            className="me-2 rounded float-start h-100"
            alt=""
          />
          <h1>
            {data.title} <p className="fw-light fs-5">By:{data.user.name}</p>
          </h1>
          <Stars rating={parseInt(data.rating)} />
          <h4>{data.category}</h4>
          <h2>{data.description}</h2>
        </div>
        {user && (data.user._id === user._id || user.admin) ? (
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
        ) : null}
        <div className="border-top mt-4">
          <h3>{data.review}</h3>
        </div>
        <div className="border-top">
          {user && (
            <form onSubmit={this.handleCommentSubmit}>
              <input
                type="text"
                name="text"
                className="form-control my-3"
                placeholder="Comment..."
                value={this.state.comment.text}
                onChange={(e) =>
                  this.handleCommentChange(e.currentTarget.value)
                }
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          )}

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
                          style={{ width: 100, height: 100 }}
                        />{" "}
                      </div>
                      <div className="col">
                        <br />
                        {comment.user.name} <br />
                        {comment.text}
                      </div>
                      <div className="col">
                        {user &&
                        (comment.user._id === user._id || user.admin) ? (
                          <div>
                            <button
                              className="btn btn-primary"
                              onClick={() => this.handleCommentEdit(comment)}
                            >
                              Edit Comment
                            </button>
                            {"      "}
                            <button
                              className="btn btn-danger"
                              onClick={() => this.handleCommentDelete(comment)}
                            >
                              Delete Comment
                            </button>
                          </div>
                        ) : null}
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
