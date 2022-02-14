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
  const { darkMode, search, searchString } = useSelector(state => state);
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
    <div className='rf-page-container'>
    <Row>
      {search && search.results &&
        search.results.length &&
        search.results.map(movie => {
          return movie.poster_path ? <MovieResult movie={movie} key={movie.id} /> : null;
        })}
    </Row>
    </div>
  );
}

export default SearchPage;
