import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "./Menu__Responsive/Menu__Responsive";
import { searchBreeds } from "../../Actions";
import styles from "./Nav.module.css";

const Nav = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchBreeds(input));
    setInput("");
  };

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
            src="https://cdn-icons-png.flaticon.com/512/21/21645.png"
            className={styles.nav__img}
            alt="logo"
          />
          <h1 className={styles.nav__title}>Dogs</h1>
        </figure>
        <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
          <input
            className={styles.form__input}
            type="text"
            placeholder="Search Breed..."
            onChange={(event) => handleChange(event)}
          />
          <button className={styles.form__button} type="submit" />
        </form>
        {menu ? (
          <Menu />
        ) : (
          <div>
            <Link to="/home">
              <button className={styles.nav__link}>Home</button>
            </Link>
            <Link to="/create-breed">
              <button className={styles.nav__link}>Create</button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
