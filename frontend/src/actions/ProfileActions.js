import { RECEIVE_ALL_SONGS_POSTED_BY_USER } from "./actionTypes.js";
import { RECEIVE_PROFILE_VIEW_FOR_POSTED } from "./actionTypes.js";
import axios from "axios";

//action creators
export const receiveAllSongsPostedByUser = songs => {
  return { type: RECEIVE_ALL_SONGS_POSTED_BY_USER, songs };
};

export const receiveProfileViewForPosted = boolValue => {
  return { type: RECEIVE_PROFILE_VIEW_FOR_POSTED, boolValue };
};

//funcs
//sample user 1
export const getAllSongsPostedByOneUser = () => dispatch => {
  return axios.get("/api/songs/users/1/").then(songs => {
    return dispatch(receiveAllSongsPostedByUser(songs.data.body));
  });
};