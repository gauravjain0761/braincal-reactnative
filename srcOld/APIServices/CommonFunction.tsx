export const dispatchAction = (
  dispatch: any,
  actionType: string,
  data: any
) => {
  dispatch({
    type: actionType,
    payload: data,
  });
};

export const dispatchErrorAction = (dispatch: any, message: string) => {
  dispatch({ type: "PRE_LOADER", payload: false });
  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      type: "error",
    },
  });
};

export const dispatchSuccessAction = (dispatch: any, message: string) => {
  dispatch({ type: "PRE_LOADER", payload: false });
  dispatch({
    type: "TOAST",
    payload: {
      message: message,
      type: "success",
    },
  });
};
