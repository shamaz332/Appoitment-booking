import * as types from "./types";

import axios from "axios";
import { returnErrors } from "./ErrorActions";
import { tokenConfig } from "./AuthActions";

export const FetchPosts = (payload) => (dispatch) => {
  dispatch(setLoading());
  const config = {};
  if (payload) {
    config["headers"] = {
      author: payload,
    };
  }
  axios
    .get("/api/posts", config)
    .then((res) =>

      dispatch({
        type: types.FETCH_POSTS,
        payload: res.data,
      },    console.log(res.data))
      
    )
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          types.FETCH_POSTS
        )
      );
    });
};

export const UpdatePost = (payload) => (dispatch, getState) => {
  axios
    .put("/api/posts", payload, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: types.UPDATE_POST,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(
          err.response.data.msg,
          err.response.status,
          types.UPDATE_POST
        )
      );
    });
};

export const setLoading = () => {
  return {
    type: types.LOADING,
  };
};
