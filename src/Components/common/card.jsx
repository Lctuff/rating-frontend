import React, { Component } from "react";
import _ from "lodash";

class Card extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data.map((item) => (
          <div className="col">
            <div className="card">
              <img src={item.img} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>

                <a href="#" className="btn btn-primary">
                  {this.props.buttonLabel}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Card;
