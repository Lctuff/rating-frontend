import React, { Component } from "react";

import { Link } from "react-router-dom";
import Stars from "./stars";

class Card extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="row">
        {data.map((item) => (
          <div key={item._id} className="col-6 mb-4">
            <div className="card">
              <img
                src={item.img}
                className="card-img-top"
                alt="..."
                style={{ height: 250 }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.title}{" "}
                  <p className="fw-light fs-6">By:{item.user.name}</p>
                  <Stars rating={item.rating} />{" "}
                </h5>
                <p className="card-text">{item.description}</p>

                <Link
                  to={this.props.link + "/" + item._id}
                  className="btn btn-primary"
                >
                  {this.props.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Card;
