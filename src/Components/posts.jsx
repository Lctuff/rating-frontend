import React, { Component } from "react";
import { getPosts } from "./../services/postService";
import Card from "./common/card";

class Posts extends Component {
  state = { posts: [] };

  async componentDidMount() {
    const { data: posts } = await getPosts();
    this.setState({ posts });
  }

  render() {
    return (
      <div className="row">
        <Card data={this.state.posts} buttonLabel="View post" link="/posts" />
      </div>
    );
  }
}

export default Posts;
