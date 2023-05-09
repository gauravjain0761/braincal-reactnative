import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, GET, POST } from "../helper/ApiConstants";
import { makeAPIRequest } from "../helper/Global";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../redux";
import { AnyAction } from "@reduxjs/toolkit";
import { PRE_LOADER } from "./types";

export const getNonce =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({ type: PRE_LOADER, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.get_nonce,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch({ type: PRE_LOADER, payload: false });
        if (request.onFail) request.onFail(error.response);
      });
  };

export const userLogin =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({ type: PRE_LOADER, payload: true });
    return makeAPIRequest({
      method: GET,
      url: api.login,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          if (response?.data?.status) {
            dispatch({ type: PRE_LOADER, payload: false });
            //   await AsyncStorage.setItem("@token", response.data.data?.auth_token);
          }
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch((error) => {
        dispatch({ type: PRE_LOADER, payload: false });
        if (request.onFail) request.onFail(error.response.data.error);
      });
  };
