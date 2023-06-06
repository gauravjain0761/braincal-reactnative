import { api, GET, POST } from "../helper/ApiConstants";
import { checkSession, makeAPIRequest } from "../helper/Global";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../redux";
import { AnyAction } from "@reduxjs/toolkit";
import {
  PRE_LOADER,
  SET_FAVOURITES_POSTS,
  SET_LEVEL_DATA,
  SET_TRICKS_DATA,
} from "./types";

export const getFavouritesData =
  (request: any): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    return makeAPIRequest({
      method: GET,
      url:
        api.post_url +
        "posts?type[]=spanish&type[]=english&type[]=hindi&type[]=french&type[]=tricks&type[]=general_knowledge&type[]=11_plus&cr=1",
      params: request.params,
    })
      .then(async (response: any) => {
        if (response.status === 200) {
          dispatch({ type: PRE_LOADER, payload: false });
          let obj = {
            data: response.data,
            page: request.params.page,
          };
          dispatch({ type: SET_FAVOURITES_POSTS, payload: obj });
          if (request.onSuccess) request.onSuccess(response.data);
        }
      })
      .catch((error) => {
        checkSession(dispatch, error, request.onFail);
      });
  };
