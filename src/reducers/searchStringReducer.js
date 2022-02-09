import { SET_SEARCH_STRING } from '../actions/types';

export default function searchReducer(state = '', action) {
  switch (action.type) {
    case SET_SEARCH_STRING:
      return action.payload;
    default:
      return state;
  }
}
