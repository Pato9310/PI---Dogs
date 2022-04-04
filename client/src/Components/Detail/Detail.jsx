import { useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import styles from "./Detail.module.css";

const Detail = () => {
  const detail = useSelector((state) => state.detail);
  return (
    <div>
      {detail.map((dog) => {
        return (
          <div className={styles.main__Container}>
            <Nav />
            <div className={styles.detail__Container} key={dog.id}>
              <img
                className={styles.detail__image}
                src={dog.image}
                alt={dog.image}
              ></img>
              <h3 className={styles.detail__title}>{dog.name}</h3>

              <div className={styles.atributes__Container}>
                <label className={styles.detail__label}>Temperaments:</label>
                <div className={styles.atributes__item}>
                  {dog.Temperaments[0]?.temperament?.map((temperament) => (
                    <div className={styles.item}>{temperament}</div>
                  ))}
                </div>
                <label className={styles.detail__label}>Height:</label>
                <div className={styles.atributes__item}>
                  <div className={styles.item}>Min: {dog.min__height}</div>
                  <div className={styles.item}>Max: {dog.max__height}</div>
                </div>
                <label className={styles.detail__label}>Weight:</label>
                <div className={styles.atributes__item}>
                  <div className={styles.item}>Min: {dog.min__weight}</div>
                  <div className={styles.item}>Max: {dog.max__weight}</div>
                </div>
                <label className={styles.detail__label}>Life Span:</label>
                <div className={styles.atributes__item}>{dog.life_span}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Detail;
