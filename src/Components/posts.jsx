import React, { Component } from "react";
import { getPosts } from "./../services/postService";
import Card from "./common/card";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import ListGroup from "./common/listGroup";

class Posts extends Component {
  state = {
    posts: [],
    currentPage: 1,
    pageSize: 4,
    ratings: [],
    selectedRating: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: posts } = await getPosts();

    const ratings = [
      { rating: "All Reviews" },
      { rating: 1, id: 1 },
      { rating: 2, id: 2 },
      { rating: 3, id: 3 },
      { rating: 4, id: 4 },
      { rating: 5, id: 5 },
    ];

    this.setState({ posts, ratings });
  }

  handleRatingSelect = (rating) => {
    this.setState({
      selectedRating: rating,
      searchQuery: "",
      currentPage: 1,
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      posts: allPosts,
      searchQuery,
      sortColumn,
      selectedRating,
    } = this.state;
    let filtered = allPosts;
    if (searchQuery)
      filtered = allPosts.filter((p) =>
        p.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedRating && selectedRating.id)
      filtered = allPosts.filter((p) => p.rating === selectedRating.rating);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const posts = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: posts };
  };

  render() {
    const { pageSize, currentPage } = this.state;
    const { totalCount, data: posts } = this.getPageData();
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.ratings}
            valueProperty="id"
            textProperty="rating"
            titleProperty="Was It Good OR Bad"
            onItemSelect={this.handleRatingSelect}
            selectedItem={this.state.selectedRating}
          />
        </div>
        <div className="col">
          <Link
            to="/post/edit/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Post
          </Link>
          <Card data={posts} buttonLabel="View post" link="/posts" />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Posts;
