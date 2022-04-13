import React, { useEffect, useState } from "react";
import CardContainer from "../CardContainer/CardContainer";
import Loading from "../Loading/Loading";
import styles from "./Home.module.css";

const Home = () => {
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={styles.Container}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.cards}>
          <CardContainer />
        </div>
      )}
    </div>
  );
};

export default Home;
