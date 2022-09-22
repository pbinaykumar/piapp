import { combineReducers } from "redux";
import {piIps,currentIp} from "./reducer";

// import { LoginReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
  piIps: piIps,
  currentIp: currentIp,
});

export default rootReducer;
