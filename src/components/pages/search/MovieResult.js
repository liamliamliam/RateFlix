import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Icon } from '@blueprintjs/core';
import { Image, Rate } from 'antd';
import * as actions from '../../../actions';
import { setTheme, parsePosterFile } from '../../../helpers';

import defaultImage from '../../../media/default-movie-poster.jpg';

function MovieResult({ movie }) {
  const dispatch = useDispatch();
  const { auth, darkMode } = useSelector(state => state);
  const navigate = useNavigate();
  const [score, setScore] = useState(movie.rating ? movie.rating.score : 0);
  const saveRating = value => {
    console.log('Saving rating:', value);
    dispatch(actions.saveRating({
      movie_id: movie.id,
      user_id: auth._id,
      score: value
    }));
  }
  useEffect(() => {
    return () => {
      setScore(0);
    }
  }, []);
  return (
    <div
      className={`${setTheme(darkMode)} rf-search-result-container`}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <Image
        src={parsePosterFile(movie.poster_path)}
        className='rf-search-result-image'
        fallback={defaultImage}
        preview={false}
      />
      {movie.rating && (
        <Icon icon='tick-circle' size={80} className='rf-search-result-tick' />
      )}
      <div className='rf-search-result-overlay rf-search-result-overlay-top'>
        {movie.title}
      </div>
      <div className='rf-search-result-overlay rf-search-result-overlay-bottom' onClick={e => e.stopPropagation()}>
        <Rate
          className='rf-search-result-rate'
          allowHalf
          count={10}
          value={score}
          onChange={v => {
            setScore(v);
            saveRating(v);
          }}
          style={{ position: 'relative', fontSize: 11 }}
        />
      </div>
    </div>
  );
}

export default MovieResult;
