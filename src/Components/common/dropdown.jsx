import React, { Component } from "react";

class DropDown extends Component {
  raiseSort = (value) => {
    const sortBy = JSON.parse(value);

    this.props.onSort(sortBy);
  };

  render() {
    return (
      <select
        onChange={(e) => this.raiseSort(e.target.value)}
        className="form-select"
      >
        <option value={JSON.stringify({ path: "title", order: "asc" })}>
          Title: Asc{" "}
        </option>
        <option value={JSON.stringify({ path: "title", order: "desc" })}>
          Title: Desc{" "}
        </option>
        <option value={JSON.stringify({ path: "rating", order: "asc" })}>
          Rating: Asc{" "}
        </option>
        <option value={JSON.stringify({ path: "rating", order: "desc" })}>
          Rating: Desc{" "}
        </option>
      </select>
    );
  }
}

export default DropDown;
