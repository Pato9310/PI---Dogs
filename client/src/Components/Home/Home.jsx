import React from "react";
import CardContainer from "../CardContainer/CardContainer";
import Nav from "../Nav/Nav";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.Container}>
      {
        <div>
          <div className={styles.nav}>
            <Nav />
          </div>
          <div className={styles.cards}>
            <CardContainer />
          </div>
        </div>
      }
    </div>
  );
};

export default Home;
