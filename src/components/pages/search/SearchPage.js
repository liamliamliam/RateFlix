import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import * as actions from '../../../actions';
import { SET_SEARCH_STRING } from '../../../actions/types';
import MovieResult from './MovieResult';
import Pagination from './Pagination';

function SearchPage(props) {
  const dispatch = useDispatch();
  const { search, searchString } = useSelector(state => state);
  const { search_string } = useParams();
  useEffect(() => {
    if (!searchString || searchString !== search_string) {
      dispatch({ type: SET_SEARCH_STRING, payload: search_string });
    }
    if (search_string) dispatch(actions.searchMovies(search_string));
    console.log(`Doing search with '${search_string}'`);
  }, [search_string]);
  if (!search) return '';
  return (
    <div className='rf-page-container'>
      <Row>
        <Col span={24}>
          <div className='rf-search-title'>
            Results for: {search_string}
          </div>
        </Col>
      </Row>
      <Row>
        {search &&
          search.results &&
          search.results.length &&
          search.results.map(movie => {
            return movie.poster_path ? (
              <MovieResult movie={movie} key={movie.id} />
            ) : null;
          })}
      </Row>
      <Row>
        <Col span={24}>
          <div className='rf-search-footer'>
            <Pagination page={search.page} total_pages={search.total_pages} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default SearchPage;
