const initialState = {
  preLoader: true,
  user: {},
  tricksData: [],
};
export default function (state = initialState, action: any) {
  switch (action.type) {
    case "PRE_LOADER": {
      return { ...state, preLoader: action.payload };
    }
    case "TOAST": {
      if (action.payload == "initial") {
        return { ...state, toast: action.payload, preLoader: true };
      } else {
        return { ...state, toast: action.payload, preLoader: false };
      }
    }
    case "SET_USER": {
      return { ...state, user: action.payload, preLoader: false };
    }
    case "SET_TRICKS_DATA": {
      return { ...state, tricksData: action.payload, preLoader: false };
    }

    default:
      return state;
  }
}
