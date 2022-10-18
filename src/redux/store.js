import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import rootReducer from "./root-reducer";
export const store = createStore(rootReducer, {}, applyMiddleware(thunk));
