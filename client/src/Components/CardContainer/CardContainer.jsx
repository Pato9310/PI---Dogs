import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  aplhabeticalSort,
  getBreeds,
  getTemperaments,
  originFilter,
  temperamentFilter,
  weightSort,
} from "../../Actions";
import Card from "../Card/Card";
import Paginated from "../Paginated/Paginated";
import styles from "./CardContainer.module.css";

const Card__Container = () => {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const filtered = useSelector((state) => state.filtered);
  const search = useSelector((state) => state.search);

  //Pages
  const [currentPage, setCurrentPage] = useState(1);
  const breedsPerPage = 8;
  const lastBreed = currentPage * breedsPerPage;
  const firstBreed = lastBreed - breedsPerPage;
  const breeds = filtered.slice(firstBreed, lastBreed);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetFilters = (event) => {
    event.preventDefault();
    document.getElementById("alphabetical").selectedIndex = 0;
    document.getElementById("weight").selectedIndex = 0;
    document.getElementById("temperaments").selectedIndex = 0;
    document.getElementById("origin").selectedIndex = 0;
    dispatch(getBreeds());
  };

  const handleFilterTemperament = (event) => {
    dispatch(temperamentFilter(event.target.value));
    setCurrentPage(1);
  };

  const handleFilterOrigin = (event) => {
    dispatch(originFilter(event.target.value));
    setCurrentPage(1);
  };

  const sortByName = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    dispatch(aplhabeticalSort(name, value));
    setCurrentPage(1);
  };

  const sortByWeight = (event) => {
    event.preventDefault();
    const { value, name } = event.target;
    dispatch(weightSort(name, value));
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getBreeds());
  }, []);

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getBreeds());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.filter__Container}>
          <div className={styles.sort__Container}>
            <label className={styles.filters}>Sort By:</label>
            <select
              className={styles.select}
              id="alphabetical"
              name="name"
              onChange={(event) => sortByName(event)}
            >
              <option defaultValue={"Alphabetical Order"}>
                Alphabetical Order
              </option>
              <option value="asc"> A-Z </option>
              <option value="desc"> Z-A </option>
            </select>

            <select
              className={styles.select}
              id="weight"
              name="max__weight"
              onChange={(event) => sortByWeight(event)}
            >
              <option defaultValue={"weight"}>Weight</option>
              <option value="desc">Major Weight</option>
              <option value="asc">Minor Weight</option>
            </select>
          </div>

          <div className={styles.sort__Container}>
            <label className={styles.filters}>Filter By:</label>
            <select
              className={styles.select}
              id="origin"
              onChange={(event) => handleFilterOrigin(event)}
            >
              <option defaultValue={"origin"}>Origin</option>
              <option value="api">API</option>
              <option value="db">DB</option>
            </select>

            <select
              className={styles.select}
              id="temperaments"
              onChange={(event) => handleFilterTemperament(event)}
            >
              <option defaultValue={"Temperament"}>Temperaments..</option>
              {temperaments.map((temperament) => (
                <option value={temperament} key={temperament}>
                  {temperament}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.sort__Container}>
            <label className={styles.filters}>Reset Filters:</label>
            <button
              className={styles.reset}
              onClick={(event) => resetFilters(event)}
            >
              Reset
            </button>
          </div>
        </div>

        <div className={styles.card__Container}>
          {search.map((breed) => {
            return (
              <div className={styles.card__ContainerdContainer} key={breed.id}>
                <Card
                  id={breed.id}
                  name={breed.name}
                  image={breed.image}
                  temperament={breed.temperament}
                  min__weight={breed.min__weight}
                  max__weight={breed.max__weight}
                />
              </div>
            );
          })}
          {filtered !== null ? (
            breeds.map((breed) => {
              return (
                <div
                  className={styles.card__ContainerdContainer}
                  key={breed.id}
                >
                  <Card
                    id={breed.id}
                    name={breed.name}
                    image={breed.image}
                    temperament={breed.temperament}
                    min__weight={breed.min__weight}
                    max__weight={breed.max__weight}
                  />
                </div>
              );
            })
          ) : (
            <div>Origin is Empty</div>
          )}
        </div>

        <Paginated
          breedsPerPage={breedsPerPage}
          breeds={filtered.length}
          paginated={paginated}
        />
      </div>
    </div>
  );
};

export default Card__Container;
