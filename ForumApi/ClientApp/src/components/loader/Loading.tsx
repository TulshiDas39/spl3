import React from "react";
//@ts-ignore
import loading from "../../assets/loading.svg";
import "./loading.css";

const Loading = () => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
