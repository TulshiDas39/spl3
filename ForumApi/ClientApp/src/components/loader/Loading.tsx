import React from "react";
//@ts-ignore
import loading from "../../assets/loading3.svg";
import "./loading.scss";

const Loading = () => (
  <div className="spinner">
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
