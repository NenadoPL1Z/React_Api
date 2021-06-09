import React from "react";
import "./error.css";
import img from "./error.jpg";

const onError = () => {
  return (
    <>
      <img src={img} alt="error"></img>
      <span className={"error"}>Something goes wrong</span>
    </>
  );
};

export default onError;
