import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row } from 'antd';
import * as actions from '../../../actions';
import { SET_SEARCH_STRING } from '../../../actions/types';
import { setTheme } from '../../../helpers';
import MovieResult from './MovieResult';

function SearchPage(props) {
  const dispatch = useDispatch();
  const { darkMode, searchResults, searchString } = useSelector((state) => state);
  const { search_string } = useParams();
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (!searchString || searchString !== search_string) {
      dispatch({ type: SET_SEARCH_STRING, payload: search_string });
    }
    if (search_string) dispatch(actions.searchMovies(search_string));
    console.log(`Doing search with '${search_string}'`);
  }, [search_string]);
  return (
    <Row>
      {searchResults && !searchResults.movies && (
        <h1 className={`${setTheme(darkMode)}`}>Search</h1>
      )}
      {searchResults &&
        searchResults.movies &&
        searchResults.movies.map((m, i) => <MovieResult movie={m} key={i} />)}
    </Row>
  );
}

export default SearchPage;
