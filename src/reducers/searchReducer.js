import { SAVE_RATING, SEARCH } from '../actions/types';

export default function searchReducer(state = {}, action) {
  switch (action.type) {
    case SEARCH:
      return action.payload;

    case SAVE_RATING:
      const stateCopy = JSON.parse(JSON.stringify(state));
      if (stateCopy && stateCopy.movies && stateCopy.movies.length) {
        stateCopy.movies.map(movie => {
          if (movie.imdbID === action.payload.imdbId) {
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
