import axios from "axios";
import {
  ALPHABETICAL_SORT,
  CREATE_BREED,
  TEMPERAMENT_FILTER,
  GET_DETAIL,
  GET_TEMPERAMENTS,
  GET_BREEDS,
  WEIGHT_SORT,
  SEARCH_BREEDS,
  ORIGIN_FILTER,
} from "../Const";

export const getBreeds = () => {
  return async (dispatch) => {
    try {
      const requestBreeds = await axios.get("http://localhost:3001/breeds");
      return dispatch({
        type: GET_BREEDS,
        payload: requestBreeds.data,
      });
    } catch (error) {
      alert("The api breeds is dosent work");
      throw error;
    }
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const requestTemperaments = await axios.get(
        "http://localhost:3001/temperaments"
      );
      return dispatch({
        type: GET_TEMPERAMENTS,
        payload: requestTemperaments.data,
      });
    } catch (error) {
      alert("The temperament request has failed");
      throw error;
    }
  };
};

export const searchBreeds = (input) => {
  return async (dispatch) => {
    try {
      const search = await axios.get(`http://localhost:3001/breeds?q=${input}`);
      return dispatch({
        type: SEARCH_BREEDS,
        payload: search.data,
      });
    } catch (error) {
      alert("Breed dosent found");
      throw error;
    }
  };
};

export const createBreed = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3001/breeds/create", payload);
      return dispatch({
        type: CREATE_BREED,
        payload,
      });
    } catch (error) {
      alert("Breed not created");
      throw error;
    }
  };
};

export const getDetail = (id) => {
  return async (dispatch) => {
    try {
      const detail = await axios.get(`http://localhost:3001/breeds/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: [detail.data],
      });
    } catch (error) {
      alert("Something went wrong with the detail request");
      throw error;
    }
  };
};

export const temperamentFilter = (payload) => {
  return {
    type: TEMPERAMENT_FILTER,
    payload,
  };
};

export const originFilter = (payload) => {
  return {
    type: ORIGIN_FILTER,
    payload,
  };
};

export const aplhabeticalSort = (name, value) => {
  return async (dispatch) => {
    try {
      const sortRequest = await axios.get(
        `http://localhost:3001/breeds/order?column=${name}&direction=${value}`
      );
      return dispatch({
        type: ALPHABETICAL_SORT,
        payload: sortRequest.data,
      });
    } catch (error) {
      alert("Something went wrong with the sort");

      throw error;
    }
  };
};

export const weightSort = (name, value) => {
  return async (dispatch) => {
    try {
      const weightSort = await axios.get(
        `http://localhost:3001/breeds/order?column=${name}&direction=${value}`
      );
      return dispatch({
        type: WEIGHT_SORT,
        payload: weightSort.data,
      });
    } catch (error) {
      alert("Something went wrong with the sort");

      throw error;
    }
  };
};
