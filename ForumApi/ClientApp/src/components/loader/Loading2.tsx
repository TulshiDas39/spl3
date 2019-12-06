import React from "react";
//@ts-ignore
import loading from "../../assets/multipleCircle.svg";
import styles from "./loading.module.css";

const Loading2 = () => (
  <div className={styles.spinner}>
    <img src={loading} alt="Loading" />
  </div>
);

export default Loading2;
