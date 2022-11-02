import React from "react";

const Card = ({ children, width = "360px", margin }) => (
  <div
    style={{
      width: width,
      margin: margin,
      padding: "20px 30px 25px",
      boxShadow: "0px 5px 10px 2px rgba(34, 60, 80, 0.2)",
      borderRadius: "8px",
    }}
  >
    {children}
  </div>
);

export default Card;
