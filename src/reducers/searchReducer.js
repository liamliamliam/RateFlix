import { SAVE_RATING, SEARCH } from '../actions/types';

export default function searchReducer(state = {}, action) {
  switch (action.type) {
    case SEARCH:
      return action.payload;
    case SAVE_RATING:
      const rating = action.payload;
      const stateCopy = JSON.parse(JSON.stringify(state));
      console.log('SEARCH_SAVE_RATING - state:', state);
      console.log('SEARCH_SAVE_RATING - rating:', rating);
      if (stateCopy && stateCopy.movies && stateCopy.movies.length) {
        stateCopy.movies.map(movie => {
          if (movie.imdbID === rating.imdbId) movie.rating = rating;
          return movie;
        }); 
      }
      console.log('SEARCH_SAVE_RATING - stateCopy:', stateCopy);
      return stateCopy;
    default:
      return state;
  }
}
