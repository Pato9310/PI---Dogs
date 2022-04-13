import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.main__container}>
      <div className={styles.spinner__container}>
        <div className={styles.spinner}></div>;
      </div>
    </div>
  );
};

export default Loading;
