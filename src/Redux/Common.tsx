import {
  ADD_FAVOURITE,
  FAVOURITES_ID,
  PRE_LOADER,
  REMOVE_FAVOURITE,
  SET_FAVOURITES_POSTS,
  SET_LANGUAGE_DATA,
  SET_LEVEL_DATA,
  SET_READ_MORE_DATA,
  SET_SEARCH_POSTS,
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
  searchPostsList: [],
  favouritesId: [],
  favouritesPosts: [],
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
    case SET_SEARCH_POSTS: {
      return { ...state, searchPostsList: action.payload, preLoader: false };
    }
    case FAVOURITES_ID: {
      return {
        ...state,
        favouritesId: action.payload,
        preLoader: false,
      };
    }
    case ADD_FAVOURITE: {
      let favouritesId = Object.assign([], state.favouritesId);
      favouritesId.push(action.payload);
      return {
        ...state,
        favouritesId: favouritesId,
        preLoader: false,
      };
    }
    case REMOVE_FAVOURITE: {
      let favouritesId = Object.assign([], state.favouritesId);
      favouritesId = favouritesId.filter((obj) => obj !== action.payload);

      let favouritesPosts = Object.assign([], state.favouritesPosts);
      if (favouritesPosts.length !== 0) {
        favouritesPosts = favouritesPosts.filter(
          (obj) => obj.id !== action.payload
        );
      }
      return {
        ...state,
        favouritesId: favouritesId,
        favouritesPosts: favouritesPosts,
        preLoader: false,
      };
    }
    case SET_FAVOURITES_POSTS: {
      if (action.payload.page === 1) {
        return {
          ...state,
          favouritesPosts: action.payload.data,
          preLoader: false,
        };
      } else {
        return {
          ...state,
          favouritesPosts: [...state.favouritesPosts, ...action.payload.data],
          preLoader: false,
        };
      }
    }
    default:
      return state;
  }
}
