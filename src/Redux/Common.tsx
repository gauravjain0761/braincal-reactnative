import {
  PRE_LOADER,
  SET_LANGUAGE_DATA,
  SET_LEVEL_DATA,
  SET_READ_MORE_DATA,
  SET_TRICKS_DATA,
  SET_USER,
} from "../actions/types";

const initialState = {
  preLoader: true,
  user: {},
  tricksData: [],
  reactMoreData: {},
  levelData: [],
  languageData: [],
};
export default function (state = initialState, action: any) {
  switch (action.type) {
    case PRE_LOADER: {
      return { ...state, preLoader: action.payload };
    }
    case "TOAST": {
      if (action.payload == "initial") {
        return { ...state, toast: action.payload, preLoader: true };
      } else {
        return { ...state, toast: action.payload, preLoader: false };
      }
    }
    case SET_USER: {
      return { ...state, user: action.payload, preLoader: false };
    }
    case SET_TRICKS_DATA: {
      if (action.payload.page === 1) {
        return { ...state, tricksData: action.payload.data, preLoader: false };
      } else {
        return {
          ...state,
          tricksData: [...state.tricksData, ...action.payload.data],
          preLoader: false,
        };
      }
    }
    case SET_READ_MORE_DATA: {
      return { ...state, reactMoreData: action.payload, preLoader: false };
    }
    case SET_LEVEL_DATA: {
      if (action.payload.page === 1) {
        return { ...state, levelData: action.payload.data, preLoader: false };
      } else {
        return {
          ...state,
          levelData: [...state.levelData, ...action.payload.data],
          preLoader: false,
        };
      }
    }
    case SET_LANGUAGE_DATA: {
      if (action.payload.page === 1) {
        return {
          ...state,
          languageData: action.payload.data,
          preLoader: false,
        };
      } else {
        return {
          ...state,
          languageData: [...state.languageData, ...action.payload.data],
          preLoader: false,
        };
      }
    }
    default:
      return state;
  }
}
