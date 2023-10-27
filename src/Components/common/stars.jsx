import React, { Component } from "react";

import { FaStar } from "react-icons/fa";

const colors = {
  orange: "#F2C265",
  grey: "a9a9a9",
};
const stars = Array(5).fill(0);

const Stars = ({ rating }) => {
  return (
    <div>
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={24}
            color={rating > index ? colors.orange : colors.grey}
          />
        );
      })}
      <p>({rating} Stars)</p>
    </div>
  );
};

export default Stars;
