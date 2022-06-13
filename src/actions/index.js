import { FETCH_USER, SEARCH, GET_MOVIE, SAVE_RATING } from './types';
import { setMode } from '../helpers';
import { backend } from '../axiosConfig';

export const fetchUser = () => async dispatch => {
  const res = await backend.get('/auth/session');
  console.log('fetchUser() - res:', res);
  dispatch({ type: FETCH_USER, payload: res.data });
  if (res.data) setMode(res.data.darkMode);
};

export const updateUser = user => async dispatch => {
  const res = await backend.put('/auth/user', user);
  dispatch({ type: FETCH_USER, payload: res.data });
  if (res.data) setMode(res.data.darkMode);
};

export const logoutUser = () => async dispatch => {
  const res = await backend.get('/auth/logout');
  dispatch({ type: FETCH_USER, payload: res.data });
  setMode(false);
};

export const searchMovies = (query, page) => async dispatch => {
  dispatch({ type: SEARCH, payload: null });
  const URL = `/search?query=${query}&page=${page}`;
  const res = await backend.get(URL);
  console.log(`Response from ${URL}:`, res.data);
  dispatch({ type: SEARCH, payload: { ...res.data, query } });
};

export const getMovie = imdbId => async dispatch => {
  const res = await backend.get(`/movie/${imdbId}`);
  dispatch({ type: GET_MOVIE, payload: res.data });
};

export const saveRating = (user_id, movie, score, notes = null) => async dispatch => {
  const rating = {
    user_id,
    movie_id: movie.id,
    movie: {
      id: movie.id,
      backdrop: movie.backdrop_path,
      poster: movie.poster_path,
      release_date: movie.release_date,
      year: new Date(movie.release_date).getFullYear(),
      title: movie.title,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count
    },
    score,
    notes
  };
  console.log('saveRating() - rating:', rating);
  const res = await backend.post('/rating', rating);
  dispatch({ type: SAVE_RATING, payload: res.data });
};
