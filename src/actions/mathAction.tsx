import { api, GET, POST } from "../helper/apiConstants";
import { checkSession, makeAPIRequest } from "../helper/global";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../redux";
import { AnyAction } from "@reduxjs/toolkit";
import {
  PRE_LOADER,
  SET_MY_PLAN,
  SET_SEARCH_POSTS,
  SET_TRICKS_DATA,
} from "./types";

export const getMathTricks =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    return makeAPIRequest({
      method: GET,
      url: api.math_tricks,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: PRE_LOADER, payload: false });
          let obj = {
            data: response.data,
            page: request.params.page,
          };
          dispatch({ type: SET_TRICKS_DATA, payload: obj });
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch((error) => {
        checkSession(dispatch, error, request.onFail);
      });
  };

export const searchPosts =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    return makeAPIRequest({
      method: GET,
      url: api.search_post + request.type,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: SET_SEARCH_POSTS, payload: response.data });
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch((error) => {
        checkSession(dispatch, error, request.onFail);
      });
  };

export const getMyPlan =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({ type: PRE_LOADER, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.plan_url + request.type,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: SET_MY_PLAN, payload: response.data });
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch((error) => {
        checkSession(dispatch, error, request.onFail);
      });
  };

export const subscribePlan =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    return makeAPIRequest({
      method: GET,
      url: api.plan_url + request.type,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response.data);
        } else {
          console.log("response err----", response);
        }
      })
      .catch((error) => {
        checkSession(dispatch, error, request.onFail);
      });
  };
