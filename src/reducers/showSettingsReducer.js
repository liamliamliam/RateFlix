import { SET_SHOW_SETTINGS } from "../actions/types";

export default function reducer(state = false, action) {
  switch(action.type) {
    case SET_SHOW_SETTINGS:
      return action.payload;
    default:
      return state;
  }
}