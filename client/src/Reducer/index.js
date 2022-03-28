const initialState = {
  isLoading: true,
  temperaments: [],
  breeds: [],
  detail: [],
  dog: [],
  createdBreed: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_BREEDS":
      return {
        ...state,
        isLoading: false,
        breeds: action.payload,
      };
    case "GET_TEMPERAMENTS":
      let array = action.payload.toString();
      return {
        ...state,
        temperaments: array.split(", "),
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "GET_DOG":
      return {
        ...state,
        dog: state.breeds.filter(
          (dog) => dog.name.toLowerCase() === action.payload.toLowerCase()
        ),
      };
    case "CREATE_DOG":
      return {
        ...state,
        createdBreed: action.payload,
      };
    default:
      return state;
  }
}
