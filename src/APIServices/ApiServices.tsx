import { setToken } from "../Helper/AsyncStorage";
import { getNonce, getPostsData, register } from "../Helper/Constants";
import {
  dispatchAction,
  dispatchErrorAction,
  dispatchSuccessAction,
} from "./CommonFunction";
import { GET, POST } from "./ResponseHandler";

export const getNonceApi = (onSuccess: any) => async (dispatch: any) => {
  dispatchAction(dispatch, "PRE_LOADER", true);
  try {
    const data = await GET(dispatch, getNonce);
    if (data.status == "ok") {
      onSuccess(data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error: any) {
    dispatchErrorAction(dispatch, error.message);
  }
};

export const getRegisterLogin =
  (postObj: any, onSuccess: any) => async (dispatch: any) => {
    try {
      const data = await GET(
        dispatch,
        register +
          "?mobile=" +
          postObj.mobile +
          "&countryCode=+" +
          postObj.countryCode +
          "&nonce=" +
          postObj.nonce
      );
      if (data.status == "ok") {
        onSuccess(data);
        dispatchAction(dispatch, "PRE_LOADER", false);
      } else {
        dispatchErrorAction(dispatch, data.message);
      }
    } catch (error: any) {
      dispatchErrorAction(dispatch, error.message);
    }
  };

export const verifyOtp =
  (postObj: any, onSuccess: any, onError: any) => async (dispatch: any) => {
    try {
      const data = await GET(
        dispatch,
        register +
          "?mobile=" +
          postObj.mobile +
          "&countryCode=+" +
          postObj.countryCode +
          "&otp_session=" +
          postObj.otp_session +
          "&otp=" +
          postObj.otp
      );
      if (data.status == "ok") {
        dispatchAction(dispatch, "SET_USER", data.user);
        setToken(data.user);
        onSuccess(data);
      } else if (data.status == "error") {
        onError(data);
      } else {
        dispatchErrorAction(dispatch, data.message);
      }
    } catch (error: any) {
      dispatchErrorAction(dispatch, error.message);
    }
  };

export const getTricks = (postObj: any) => async (dispatch: any) => {
  try {
    const data = await GET(
      dispatch,
      getPostsData + "?cr=1&page=" + postObj.page + "&per_page=20"
    );
    console.log("here--", data);
    if (data.length !== 0) {
      dispatchAction(dispatch, "SET_TRICKS_DATA", data);
    } else {
      dispatchErrorAction(dispatch, data.message);
    }
  } catch (error: any) {
    dispatchErrorAction(dispatch, error.message);
  }
};
