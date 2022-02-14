import { SAVE_RATING, SEARCH } from '../actions/types';

export default function searchReducer(state = {}, action) {
  switch (action.type) {
    case SEARCH:
      return action.payload;

    case SAVE_RATING:
      const stateCopy = JSON.parse(JSON.stringify(state));
      if (stateCopy && stateCopy.results && stateCopy.results.length) {
        stateCopy.results.map(movie => {
          if (movie.id === action.payload.movie_id) {
            movie.rating = action.payload;
          }
          return movie;
        });
      }
      return stateCopy;

    default:
      return state;
  }
}
