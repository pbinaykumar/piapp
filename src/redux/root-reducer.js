// import { combineReducers } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AnyAction, combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {piIps,currentIp} from "./reducer";
import logger from 'redux-logger';
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  blacklist: ['vendors'],
};
// import { LoginReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
  piIps: piIps,
  currentIp: currentIp,
});

export default rootReducer;

const persistanceReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistanceReducer,
  middleware: [thunk, logger],
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export type TypedDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
// export type TypedThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   AnyAction
// >;
