import { combineReducers } from "redux";
import common from "./Common";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
const reducers = combineReducers({ common });
const middleware = [thunk];
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
const store = configureStore({ reducer: reducers, middleware });

export default store;
