import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Icon } from '@blueprintjs/core';
import { Image, Rate } from 'antd';
import * as actions from '../../../actions';
import { setTheme } from '../../../helpers';

import defaultImage from '../../../media/default-movie-poster.jpg';

function MovieResult({ movie }) {
  const dispatch = useDispatch();
  const { auth, darkMode } = useSelector(state => state);
  const navigate = useNavigate();
  const [rating, setRating] = useState(movie.rating ? movie.rating.rating : 0);
  const saveRating = value => {
    console.log('Saving rating:', value);
    dispatch(actions.saveRating({
      imdbId: movie.imdbID,
      userId: auth._id,
      rating: value
    }));
  }
  useEffect(() => {
    return () => {
      setRating(0);
    }
  }, []);
  return (
    <div
      className={`${setTheme(darkMode)} rf-search-result-container`}
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
    >
      <Image
        src={movie.Poster}
        className='rf-search-result-image'
        fallback={defaultImage}
        preview={false}
      />
      {movie.rating && (
        <Icon icon='tick-circle' size={80} className='rf-search-result-tick' />
      )}
      <div className='rf-search-result-overlay rf-search-result-overlay-top'>
        {movie.Title}
      </div>
      <div className='rf-search-result-overlay rf-search-result-overlay-bottom' onClick={e => e.stopPropagation()}>
        <Rate
          className='rf-search-result-rate'
          allowHalf
          count={10}
          value={rating}
          onChange={v => {
            setRating(v);
            saveRating(v);
          }}
          style={{ position: 'relative', fontSize: 11 }}
        />
      </div>
    </div>
  );
}

export default MovieResult;
