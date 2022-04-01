import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "./useForm";
import Nav from "../Nav/Nav";
import styles from "./Create.module.css";

const initialForm = {
  name: "",
  min__height: "",
  max__height: "",
  min__weight: "",
  max__weight: "",
  life__span: "",
  temperament: [],
};

const validationsForm = (form) => {
  let errors = {};
  if (!form.name) {
    errors.name = "You must complete the 'Name' field.";
  } else if (!form.min__height) {
    errors.min__height = "You must complete the 'Min height' field.";
  } else if (!form.max__height) {
    errors.max__weight = "You must complete the 'Max height' field.";
  } else if (!form.min__weight) {
    errors.min__weight = "You must complete the 'Min weight' field.";
  } else if (!form.max__weight) {
    errors.max__weight = "You must complete the 'Max weight' field.";
  } else if (!form.life__span) {
    errors.life__span = "You must complete the 'Life span' field.";
  } else if (!form.temperament) {
    errors.temperament = "You must complete the 'Temperament' field.";
  }
  return errors;
};

const Create = () => {
  const temperaments = useSelector((state) => state.temperaments);
  const {
    form,
    errors,
    handleChange,
    handleSubmit,
    handleDelete,
    handleSelect,
  } = useForm(initialForm, validationsForm);

  return (
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
                onChange={handleChange}
              />
              {errors.name && <p className={styles.errors}>{errors.name}</p>}
            </div>
            <div className={styles.breed__input__container} id="min__height">
              <label>Min Height: </label>
              <input
                className={styles.breed__input}
                type="range"
                value={form.summary}
                name="min__height"
                placeholder="Min Height..."
                min="5"
                max="30"
                onChange={handleChange}
              />
              {errors.min__height && (
                <p className={styles.errors}>{errors.min__height}</p>
              )}
            </div>
            <div className={styles.breed__input__container} id="max__height">
              <label>Max Height : {form.max__height} </label>
              <input
                className={styles.breed__input}
                type="range"
                name="max__height"
                min="9"
                max="35"
                value={form.max__height}
                onChange={(event) => handleChange(event)}
              />
              {errors.max__height && (
                <p className={styles.errors}> {errors.max__height}</p>
              )}
            </div>
            <div className={styles.breed__input__container} id="min__weight">
              <label>Min weight : {form.min__weight}</label>
              <input
                className={styles.breed__input}
                type="range"
                name="min__weight"
                min="3"
                max="130"
                value={form.min__weight}
                onChange={(event) => handleChange(event)}
              />
              {errors.min__weight && (
                <p className={styles.errors}>{errors.min__weight}</p>
              )}
            </div>
            <div className={styles.breed__input__container} id="max__weight">
              <label>Max Weight:</label>
              <input
                className={styles.breed__input}
                type="range"
                name="max__weight"
                min="6"
                max="200"
                value={form.max__weight}
                onChange={(event) => handleChange(event)}
              />
              {errors.max__weight && (
                <p className={styles.errors}>{errors.max__weight}</p>
              )}
            </div>

            <div className={styles.breed__input__container} id="life__span">
              <label>Life Span:</label>
              <input
                className={styles.breed__input}
                type="text"
                name="life__span"
                value={form.life__span}
                onChange={(event) => handleChange(event)}
              />
              {errors.life__span && (
                <p className={styles.errors}>{errors.life__span}</p>
              )}
            </div>

            <div>
              <select
                name="temperament"
                className={styles.breed__input}
                id="temperament"
                onChange={(event) => handleSelect(event)}
              >
                <option>Temperaments: </option>
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
                <div key={temperament} className={styles.temperaments__Slot}>
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
  );
};

export default Create;
