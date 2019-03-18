import { RECEIVE_ALL_FAVORITES_FOR_USER } from "../actions/actionTypes.js";
import merge from "lodash/merge";

const normalizeData = arr => {
  let obj = {};
  arr.forEach(favorite => {
    obj[favorite.id] = favorite;
  });
  return obj;
};

const FavoritesReducer = (oldState = [], action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_FAVORITES_FOR_USER:
      let newState = merge({}, oldState);
      return {
        ...newState,
        allFavoritesForUser: normalizeData(action.favorites)
      };
    default:
      return oldState;
  }
};

export default FavoritesReducer;