import { api, GET, POST } from "../helper/ApiConstants";
import { makeAPIRequest } from "../helper/Global";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../redux";
import { AnyAction } from "@reduxjs/toolkit";
import { PRE_LOADER } from "./types";

export const sendFeedback =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({ type: PRE_LOADER, payload: true });
    return makeAPIRequest({
      method: POST,
      url: api.feedback,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: PRE_LOADER, payload: false });
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch({ type: PRE_LOADER, payload: false });
        if (request.onFail) request.onFail(error.response.data.error);
      });
  };

export const updateUser =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    return makeAPIRequest({
      method: POST,
      url: api.update_user,
      data: request.data,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: PRE_LOADER, payload: false });
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch({ type: PRE_LOADER, payload: false });
        if (request.onFail) request.onFail(error.response.data.error);
      });
  };
