import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "./useForm";
import NavBar from "../NavBar/NavBar";
import "./Create.module.css";

const initialForm = {
  name: "",
  min__height: "",
  max__height: "",
  min__weight: "",
  max__weight: "",
  temperaments: [],
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
  } else if (!form.temperaments) {
    errors.temperaments = "You must complete the 'Temperaments' field.";
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
      <NavBar />
      <div className="recipeCardContainer">
        <div className="recipeCard">
          <form className="formRecipe" onSubmit={handleSubmit}>
            <span className="titleCreateRecipe"> Create New Breed </span>
            <div className="inputRecipes">
              <label className="labelRecipe" id="name">
                Name:{" "}
              </label>
              <input
                className="i"
                type="text"
                placeholder="Breed name..."
                value={form.name}
                name="name"
                onChange={handleChange}
              />
              {errors.name && <p className="errors">{errors.name}</p>}
            </div>
            <div className="inputRecipes" id="summary">
              <label>Min Height: </label>
              <input
                className="i"
                type="text"
                value={form.summary}
                name="min__height"
                placeholder="Min Height..."
                onChange={handleChange}
              />
              {errors.min__height && (
                <p className="errors">{errors.min__height}</p>
              )}
            </div>
            <div className="inputRecipes" id="score">
              <label>Max Height : {form.max__height} </label>
              <input
                className="i"
                type="range"
                name="max__height"
                min="1"
                max="100"
                value={form.max__height}
                onChange={(event) => handleChange(event)}
              />
              {errors.max__height && (
                <p className="errors"> {errors.max__height}</p>
              )}
            </div>
            <div className="inputRecipes" id="healthyScore">
              <label>Min weight : {form.min__weight}</label>
              <input
                className="i"
                type="range"
                name="min__weight"
                min="1"
                max="100"
                value={form.min__weight}
                onChange={(event) => handleChange(event)}
              />
              {errors.min__weight && (
                <p className="errors">{errors.min__weight}</p>
              )}
            </div>
            <div className="inputRecipes">
              <label className="msgs">Max Weight:</label>
              <textarea
                id="steps"
                name="max__weight"
                className="steps"
                type="text"
                value={form.max__weight}
                onChange={(event) => handleChange(event)}
              />
              {errors.max__weight && (
                <p className="errors">{errors.max__weight}</p>
              )}
            </div>

            <div>
              <select
                name="temperaments"
                className="i"
                id="temperament"
                onChange={(event) => handleSelect(event)}
              >
                <option className="op">Temperaments: </option>
                {temperaments.map((temperament) => (
                  <option className="op" value={temperament} key={temperament}>
                    {temperament}
                  </option>
                ))}
              </select>
              {errors.temperaments && (
                <p className="errors">{errors.temperaments}</p>
              )}
            </div>

            <div className="textArea">
              {form.temperaments.map((temperament) => (
                <div key={temperament} className="typeAndButton">
                  <p className="pOfType">{temperament}</p>
                  <input
                    className="btnDelete"
                    type="button"
                    value="X"
                    onClick={() => handleDelete(temperament)}
                  />
                </div>
              ))}
            </div>
            <div className="btnContainer">
              <button className="btnRecipe" type="submit">
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
