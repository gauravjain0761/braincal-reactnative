import { combineReducers } from "redux";
import common from "./Common";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
const reducers = combineReducers({ common });
const middleware = [thunk];
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const store = configureStore({ reducer: reducers, middleware });

export default store;
