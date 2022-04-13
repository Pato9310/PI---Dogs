import {
  ALPHABETICAL_SORT,
  CREATE_BREED,
  GET_BREEDS,
  GET_DETAIL,
  GET_TEMPERAMENTS,
  ORIGIN_FILTER,
  SEARCH_BREEDS,
  TEMPERAMENT_FILTER,
  WEIGHT_SORT,
} from "../Const";

const initialState = {
  temperaments: [],
  allBreeds: [],
  filtered: [],
  detail: [],
  createdBreed: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        allBreeds: action.payload,
        filtered: action.payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case SEARCH_BREEDS:
      return {
        ...state,
        filtered: action.payload,
      };

    case CREATE_BREED:
      return {
        ...state,
        allBreeds: [...state.allBreeds, action.payload],
        createdBreed: action.payload,
      };

    case ALPHABETICAL_SORT:
      return {
        ...state,
        filtered: action.payload,
      };

    case WEIGHT_SORT:
      return {
        ...state,
        filtered: action.payload,
      };

    case TEMPERAMENT_FILTER:
      const breeds = state.allBreeds;
      const filteredByTemperament = breeds.filter((breed) =>
        breed.temperament?.some(
          (temperament) =>
            temperament.toLowerCase() === action.payload.toLowerCase()
        )
      );
      return {
        ...state,
        filtered: filteredByTemperament,
      };

    case ORIGIN_FILTER:
      const api = state.allBreeds.filter((breed) => breed.id.length <= 6);
      const db = state.allBreeds.filter((breed) => breed.id.length > 6);
      const origin = action.payload === "api" ? api : db;
      return {
        ...state,
        filtered: origin.length ? origin : null,
      };

    default:
      return state;
  }
}
