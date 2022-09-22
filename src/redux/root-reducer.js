import { combineReducers } from "redux";
import piIps from "./reducer";

// import { LoginReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
  piIps: piIps,
});

export default rootReducer;
