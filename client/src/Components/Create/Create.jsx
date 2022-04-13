import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "./useForm";
import Nav from "../Nav/Nav";
import styles from "./Create.module.css";
import Loading from "../Loading/Loading";

const Create = () => {
  const temperaments = useSelector((state) => state.temperaments);
  const [loading, setLoading] = useState();
  const { form, errors, handleBlur, handleSubmit, handleDelete } = useForm();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Nav />
          <div className={styles.card__Container}>
            <div className={styles.breed__Card}>
              <form onSubmit={handleSubmit}>
                <span className={styles.breed__title}> Create New Breed </span>
                <div className={styles.breed__input__container}>
                  <label className={styles.breed__label} id="name">
                    Name:{" "}
                  </label>
                  <input
                    className={styles.breed__input}
                    type="text"
                    placeholder="Breed name..."
                    value={form.name}
                    name="name"
                    autoComplete="off"
                    onChange={handleBlur}
                  />
                  {errors.name && (
                    <p className={styles.errors}>{errors.name}</p>
                  )}
                </div>
                <div
                  className={styles.breed__input__container}
                  id="min__height"
                >
                  <label className={styles.breed__label}>
                    Min Height: {form.min__height}{" "}
                  </label>
                  <input
                    className={styles.breed__input}
                    type="range"
                    value={form.min__height}
                    name="min__height"
                    placeholder="Min Height..."
                    min="5"
                    max="30"
                    autoComplete="off"
                    onChange={handleBlur}
                  />
                  {errors.min__height && (
                    <p className={styles.errors}>{errors.min__height}</p>
                  )}
                </div>
                <div
                  className={styles.breed__input__container}
                  id="max__height"
                >
                  <label className={styles.breed__label}>
                    Max Height : {form.max__height}{" "}
                  </label>
                  <input
                    className={styles.breed__input}
                    type="range"
                    name="max__height"
                    min="9"
                    max="35"
                    value={form.max__height}
                    autoComplete="off"
                    onChange={(event) => handleBlur(event)}
                  />
                  {errors.max__height && (
                    <p className={styles.errors}> {errors.max__height}</p>
                  )}
                </div>
                <div
                  className={styles.breed__input__container}
                  id="min__weight"
                >
                  <label className={styles.breed__label}>
                    Min weight : {form.min__weight}
                  </label>
                  <input
                    className={styles.breed__input}
                    type="range"
                    name="min__weight"
                    min="3"
                    max="130"
                    value={form.min__weight}
                    autoComplete="off"
                    onChange={(event) => handleBlur(event)}
                  />
                  {errors.min__weight && (
                    <p className={styles.errors}>{errors.min__weight}</p>
                  )}
                </div>
                <div
                  className={styles.breed__input__container}
                  id="max__weight"
                >
                  <label className={styles.breed__label}>
                    Max Weight: {form.max__weight}
                  </label>
                  <input
                    className={styles.breed__input}
                    type="range"
                    name="max__weight"
                    min="6"
                    max="200"
                    value={form.max__weight}
                    autoComplete="off"
                    onChange={(event) => handleBlur(event)}
                  />
                  {errors.max__weight && (
                    <p className={styles.errors}>{errors.max__weight}</p>
                  )}
                </div>

                <div className={styles.breed__input__container} id="life__span">
                  <label className={styles.breed__label}>Life Span:</label>
                  <input
                    className={styles.breed__input}
                    type="text"
                    name="life__span"
                    value={form.life__span}
                    placeholder="7 - 10 years for example"
                    autoComplete="off"
                    onChange={(event) => handleBlur(event)}
                  />
                  {errors.life__span && (
                    <p className={styles.errors}>{errors.life__span}</p>
                  )}
                </div>

                <div>
                  <label className={styles.breed__label}>Temperaments:</label>
                  <select
                    name="temperament"
                    className={styles.breed__input}
                    id="temperament"
                    onChange={(event) => handleBlur(event)}
                  >
                    {temperaments.map((temperament) => (
                      <option value={temperament} key={temperament}>
                        {temperament}
                      </option>
                    ))}
                  </select>
                  {errors.temperament && (
                    <p className={styles.errors}>{errors.temperament}</p>
                  )}
                </div>

                <div className={styles.temperaments__Container}>
                  {form.temperament.map((temperament) => (
                    <div
                      key={temperament}
                      className={styles.temperaments__Slot}
                    >
                      <p className={styles.temperament__name}>{temperament}</p>
                      <button
                        className={styles.temperament__Btn__Delete}
                        onClick={() => handleDelete(temperament)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
                <div className={styles.btn__Container}>
                  <button className={styles.btn__Breed} type="submit">
                    Create Breed
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
