import React, { useState } from "react";
import Menu from "./Menu__Responsive/Menu__Responsive";
import styles from "./Nav.module.css";

const Nav = () => {
  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    if (window.innerWidth >= 768) {
      return setMenu(false);
    }
    return setMenu(true);
  };
  window.addEventListener("resize", showMenu);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <figure className={styles.nav__logo}>
          <img
            src="https://image.pngaaa.com/557/3780557-middle.png"
            className={styles.nav__img}
            alt="logo"
          />
        </figure>
        <form className={styles.form}>
          <input
            className={styles.form__input}
            type="search"
            placeholder="Search.."
          />
          <div className={styles.form__button}></div>
        </form>
        {menu ? (
          <Menu />
        ) : (
          <div>
            <a href="#" className={styles.nav__link}>
              Home
            </a>
            <a href="#" className={styles.nav__link}>
              Create
            </a>
            <a href="#" className={styles.nav__link}>
              Cards
            </a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
