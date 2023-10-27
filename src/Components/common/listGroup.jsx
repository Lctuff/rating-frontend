import React from "react";
import Stars from "./stars";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    titleProperty,
    onItemSelect,
    selectedItem,
    valueProperty,
  } = props;
  return (
    <ul className="list-group">
      <li className="list-group-item list-group-item-info">{titleProperty}</li>
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[textProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[valueProperty] ? (
            <Stars rating={parseInt(item[textProperty])} />
          ) : (
            item[textProperty]
          )}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
};

export default ListGroup;
