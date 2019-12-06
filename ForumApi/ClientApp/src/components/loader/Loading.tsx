import React from "react";
//@ts-ignore
import loading from "../../assets/loading3.svg";
import styles from "./loading.module.scss";

const Loading = () => (
  <div className={styles.spinner}>
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading;
