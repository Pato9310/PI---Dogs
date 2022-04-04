import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../../Actions";
import styles from "./Card.module.css";

const Card = (prop) => {
  const { id, name, image, temperament, max__weight, min__weight } = prop;
  const dispatch = useDispatch();

  const onClick = (id) => {
    dispatch(getDetail(id));
  };

  return (
    <div className={styles.main__Container}>
      <div className={styles.card__Container} key={id}>
        <div className={styles.card__Front}>
          <div className={styles.breed}>
            <img className={styles.breed__Image} src={image} alt="Not found" />
            <h2 className={styles.breed__Name}>{name}</h2>
          </div>
          <div className={styles.temperament__Container}>
            <div className={styles.label}>Temperaments</div>
            {temperament?.map((temperament) => (
              <h5 className={styles.temperament} key={temperament}>
                {temperament}
              </h5>
            ))}
            <div className={styles.label}>Weight</div>
            <h5>Min: {min__weight}</h5>
            <h5>Max: {max__weight}</h5>
          </div>
          <div className={styles.btn__Container}>
            <Link to={`/breeds/${id}`}>
              <button className={styles.btn} onClick={() => onClick(id)}>
                {">"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
