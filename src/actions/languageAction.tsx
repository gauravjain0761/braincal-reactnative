import { api, GET, POST } from "../helper/ApiConstants";
import { checkSession, makeAPIRequest } from "../helper/Global";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../redux";
import { AnyAction } from "@reduxjs/toolkit";
import {
  PRE_LOADER,
  SET_LANGUAGE_DATA,
  SET_LEVEL_DATA,
  SET_TRICKS_DATA,
} from "./types";

export const getLanguageData =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    return makeAPIRequest({
      method: GET,
      url: api.post_url + request.params.type,
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: PRE_LOADER, payload: false });
          let obj = {
            data: response.data,
            page: request.params.page,
          };
          dispatch({ type: SET_LANGUAGE_DATA, payload: obj });
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch((error) => {
        checkSession(dispatch, error, request.onFail);
      });
  };
