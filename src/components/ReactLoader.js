import React from "react";
import Loader from "react-loader-spinner";
import "../styles/items.css";

function ReactLoader() {
  return (
    <Loader
      type="Puff"
      className="react-loader"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  );
}

export default ReactLoader;
