import React from "react";
import styles from "./Access.module.css";

const Access = () => {
  return (
    <section className={styles.access__container}>
      <img
        src="https://image.pngaaa.com/557/3780557-middle.png"
        className={styles.access__img}
        alt="access"
      />
      <h1 className={styles.access__title}>Titulo del Proyecto</h1>
      <p className={styles.access__paragraph}>
        Breve descripcion del proyecto o bien algun mensaje de bienvenida al
        sitio weba
      </p>
      <a href="#" className={styles.access__cta}>
        Get Started
      </a>
    </section>
  );
};

export default Access;
