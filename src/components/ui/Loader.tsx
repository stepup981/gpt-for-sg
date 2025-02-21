import React from "react";

const Loader = () => {
  return (
    <div
      className="has-text-centered is-flex is-justify-content-center is-align-items-center"
      style={{ height: "100vh" }}
    >
      <span
        className="loader is-size-1"
        style={{
          borderBottom: "2px solid #3273dc",
          borderRight: "2px solid #3273dc",
          borderLeft: "2px solid #3273dc"
        }}
      ></span>
    </div>
  );
};

export default Loader;
