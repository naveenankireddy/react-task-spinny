import React from "react";
import "../styles/items.css";

export const Item = ({ item }) => {
  const { image_url, title } = item;
  return (
    <div className="item">
      <img src={image_url} />
      <div className="item-title">
        <h5>{title}</h5>
      </div>
    </div>
  );
};
