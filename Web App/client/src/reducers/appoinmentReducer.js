import * as types from "../actions/types";
const initState = {
  posts: [],
  onePost: {},
  loading: false,
};

const appoinmentReducer = (state = initState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
      case types.UPDATE_POST:
        return {
          ...state,
          profile: action.payload,
          isLoading: false,
          isEditing: false,
        };
    case types.UPDATE_POST:
      return {
        ...state,
        posts: action.payload,
      };
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default appoinmentReducer;
