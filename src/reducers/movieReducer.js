import { GET_MOVIE } from '../actions/types';

export default function moovieReducer(state = null, action) {
  switch (action.type) {
    case GET_MOVIE:
      return action.payload;
    default:
      return state;
  }
}