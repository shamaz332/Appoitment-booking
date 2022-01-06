import * as types from "./../actions/types";
const initState = {
  posts: [],
  onePost: {},
  loading: false,
};

const postReducer = (state = initState, action) => {
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
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          else return post;
        }),
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

export default postReducer;
