import axios from 'axios';
import { FETCH_USER, SEARCH, GET_MOVIE, SET_DARK_MODE, SAVE_RATING } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/session');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUser = user => async dispatch => {
  const res = await axios.put('/auth/user', user);
  dispatch({ type: FETCH_USER, payload: res.data });
  dispatch({ type: SET_DARK_MODE, payload: res.data.darkMode });
};

export const logoutUser = () => async dispatch => {
  const res = await axios.get('/auth/logout');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const searchMovies = (searchString) => async dispatch => {
  dispatch({ type: SEARCH, payload: null });
  const URL = `/api/movie/search/${searchString}`;
  const res = await axios.get(URL);
  console.log(`Response from ${URL}:`, res.data);
  const searchResults = { ...res.data, searchString };
  dispatch({ type: SEARCH, payload: searchResults });
};

export const getMovie = imdbId => async dispatch => {
  const res = await axios.get(`/api/movie/${imdbId}`);
  dispatch({ type: GET_MOVIE, payload: res.data });
};

export const saveRating = rating => async dispatch => {
  const res = await axios.post('/api/rating', rating);
  dispatch({ type: SAVE_RATING, payload: res.data });
};
