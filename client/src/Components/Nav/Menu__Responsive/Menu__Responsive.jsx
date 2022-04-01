import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Menu__Responsive.module.css";

const Menu = () => {
  const [show, setShow] = useState(false);

  const handleMenuClose = (e) => {
    const currentClass = e.target.className;

    if (currentClass === "menu-card") {
      return;
    }

    setShow(false);
  };

  const handleMenuOpen = () => {
    setShow(true);
  };

  return (
    <div className="App">
      <div hidden={!show}>
        <div className={styles.menu__background}>
          <div className={styles.menu__card}>
            <button className={styles.menu__close} onClick={handleMenuClose}>
              X
            </button>
            <Link to="/home">
              <button className={styles.nav__link}>Home</button>
            </Link>
            <Link to="/create-breed">
              <button className={styles.nav__link}>Create</button>
            </Link>
            <Link to="/home">
              <button className={styles.nav__link}>Cards</button>
            </Link>
          </div>
        </div>
      </div>
      {/* <button className={styles.menu__button} onClick={handleMenuOpen}> */}
      <div className={styles.menu__button__container} onClick={handleMenuOpen}>
        <div className={styles.button__bar1}></div>
        <div className={styles.button__bar1}></div>
        <div className={styles.button__bar1}></div>
      </div>
      {/* </button> */}
    </div>
  );
};

export default Menu;
