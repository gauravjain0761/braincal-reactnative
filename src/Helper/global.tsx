import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { FC } from "react";
import { Alert } from "react-native";
import { api } from "./ApiConstants";
import { PRE_LOADER } from "../actions/types";
export const navigationRef = React.createRef();

interface props {
  method?: any;
  url?: any;
  data?: any;
  headers?: any;
  params?: any;
}

export const makeAPIRequest = ({ method, url, data, headers, params }: props) =>
  new Promise((resolve, reject) => {
    const option = {
      method,
      baseURL: api.BASE_URL,
      url,
      data,
      headers,
      params,
    };
    axios(option)
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          //   clearAsync();
          //   navigationRef.current.reset({
          //     index: 1,
          //     routes: [{ name: "Login" }],
          //   });
        }
        reject(error);
      });
  });

export const clearAsync = async () => {
  await AsyncStorage.clear();
};

export const dispatchErrorAction = (dispatch: any, message: string) => {
  dispatch({ type: PRE_LOADER, payload: false });
  // Alert.alert("Error", message, [
  //   { text: "OK", onPress: () => console.log("OK Pressed") },
  // ]);
  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      type: "error",
    },
  });
};

export const dispatchSuccessAction = (dispatch: any, message: string) => {
  dispatch({ type: PRE_LOADER, payload: false });
  // Alert.alert("Success", message, [
  //   { text: "OK", onPress: () => console.log("OK Pressed") },
  // ]);
  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      type: "success",
    },
  });
};

export const setToken = async (token: string) => {
  await AsyncStorage.setItem("@token", JSON.stringify(token));
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem("@token");
  if (token) {
    return JSON.parse(token);
  } else {
    return null;
  }
};

export const setUserInfoAsync = async (user: any) => {
  await AsyncStorage.setItem("@user_info", JSON.stringify(user));
};

export const getUserInfo = async () => {
  const userInfo = await AsyncStorage.getItem("@user_info");
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return null;
  }
};
