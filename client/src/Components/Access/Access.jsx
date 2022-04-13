import React from "react";
import { Link } from "react-router-dom";
import styles from "./Access.module.css";

const Access = () => {
  return (
    <section className={styles.access__container}>
      <h1 className={styles.access__title}>The Dog House</h1>
      <p className={styles.access__paragraph}>
        At <b>Dog House</b> we invite you to learn about the different existing
        breeds and learn about their characteristics.
        <br />
        <br /> What are you waiting for?
      </p>
      <Link to="/home">
        <button className={styles.access__cta}>Get Started</button>
      </Link>
    </section>
  );
};

export default Access;
