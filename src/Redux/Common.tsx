import {
  ADD_FAVOURITE,
  FAVOURITES_ID,
  ON_SELECT_ANS,
  PRE_LOADER,
  REMOVE_FAVOURITE,
  SET_FAVOURITES_POSTS,
  SET_LANGUAGE_DATA,
  SET_LEVEL_DATA,
  SET_MY_PLAN,
  SET_QUESTIONS,
  SET_READ_MORE_DATA,
  SET_SEARCH_POSTS,
  SET_TIMER_COUNTDOWN,
  SET_TRICKS_DATA,
  SET_USER,
} from "../actions/types";

const initialState = {
  preLoader: false,
  user: {},
  tricksData: [],
  reactMoreData: {},
  levelData: [],
  languageData: [],
  searchPostsList: [],
  favouritesId: [],
  favouritesPosts: [],
  questions: {},
  toast: {},
  myPlan: {},
  runTimer: false,
  countDown: 0,
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
    case SET_QUESTIONS: {
      return { ...state, questions: action.payload, preLoader: false };
    }
    case ON_SELECT_ANS: {
      console.log(action.payload);
      let questions = Object.assign({}, state.questions);
      questions.questions[action.payload.index].selected_answer_index =
        action.payload.optionIndex;
      return { ...state, questions: questions, preLoader: false };
    }
    case SET_MY_PLAN: {
      return { ...state, myPlan: action.payload, preLoader: false };
    }
    case SET_TIMER_COUNTDOWN: {
      console.log("here---", action.payload);
      return {
        ...state,
        runTimer: action.payload.runTimer,
        countDown: action.payload.countDown,
        preLoader: false,
      };
    }
    default:
      return state;
  }
}
