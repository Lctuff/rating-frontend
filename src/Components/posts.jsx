import React, { Component } from "react";
import { getPosts } from "./../services/postService";
import Card from "./common/card";
import { Link } from "react-router-dom";

class Posts extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const { data: posts } = await getPosts();
    this.setState({ posts });
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <Link
            to="/post/edit/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Post
          </Link>
          <Card data={this.state.posts} buttonLabel="View post" link="/posts" />
        </div>
      </div>
    );
  }
}

export default Posts;
