import ToggleReducer from "./ToggleReducer";
import appoinmentReducer from "./appoinmentReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

const rootreducer = combineReducers({
  post: appoinmentReducer,
  Toggle: ToggleReducer,
  auth: authReducer,
  error: errorReducer,
  profile: profileReducer,
});

export default rootreducer;
