import React from "react";
//@ts-ignore
import loading from "../../assets/multipleCircle.svg";
import "./loading.css";

const Loading2 = () => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading2;
