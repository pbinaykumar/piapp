import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import rootReducer from "./root-reducer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['bookmarks']
  };
  const newrootReducer = combineReducers({
    rootReducer: persistReducer(persistConfig, rootReducer)
  });
export const store = createStore(newrootReducer, {}, applyMiddleware(thunk));
export const persistor = persistStore(store);
