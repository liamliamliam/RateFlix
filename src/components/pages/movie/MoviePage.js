import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Row, Col, Image } from 'antd';
import { Tag, Button, Classes } from '@blueprintjs/core';
import { setTheme } from '../../../helpers';
import defaultImage from '../../../media/default-movie-poster.jpg';
import imdbLogo from '../../../media/IMDB_Logo_2016.svg';

import MovieDetails from './MovieDetails';
import MovieCast from './MovieCast';
import MovieRating from './MovieRating';

function MoviePage() {
  const { id } = useParams();
  const { auth, darkMode } = useSelector(state => state);
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [movie, setMovie] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  console.log('MoviePage - auth:', auth);
  const NoMovieFound = () => {
    return <div>No movie found.</div>;
  };
  const loadMovie = async () => {
    try {
      setLoadingMovie(true);
      const res = await axios.get(`/api/movie/${id}`);
      console.log('MoviePage - loadMovie() - res:', res);
      setMovie(res.data);
      setLoadingMovie(false);
    } catch (err) {
      console.log('loadMovie() - ERROR:', err);
      setLoadingError(true);
      setLoadingMovie(false);
    }
  };
  useEffect(() => {
    if (auth) loadMovie();
    return () => {
      setLoadingMovie(false);
      setLoadingError(false);
      setMovie(null);
      setShowRatingForm(false);
    };
  }, [auth]);
  if (!id) return <NoMovieFound />;
  if (movie) {
    return (
      <div
        className='rf-page-container'
        style={{
          backgroundImage: `url("${movie.imagePaths.backdrop.original}")`,
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div
          className={`${setTheme(darkMode)} rf-movie-container`}
          style={{ width: '100%' }}
        >
          <Row>
            <Col span={24}>
              <div className={`${setTheme(darkMode)} rf-movie-title`}>
                {movie.title}
                <span className='rf-movie-title-year'>
                  {movie.release_date.substring(0, 4)}
                </span>
                <div className='rf-movie-title-subtitle'>{movie.tagline}</div>
                <img
                  src={imdbLogo}
                  className='rf-movie-imdb-logo'
                  onClick={() => {
                    window.open(`https://www.imdb.com/title/${movie.imdb_id}`);
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col sm={6} xs={24}>
              <Row>
                <Col span={24}>
                  <img
                    src={movie.imagePaths.poster.normal}
                    className='rf-movie-poster'
                    onError={() => {
                      this.onerror = null;
                      this.src = defaultImage;
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <MovieDetails movie={movie} />
                </Col>
              </Row>
            </Col>
            <Col sm={18} xs={24}>
              <Row>
                <Col span={24}>
                  <MovieRating movie={movie} />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <MovieCast cast={movie.credits.cast} darkMode={darkMode} />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  } else {
    if (loadingMovie) {
      return <div>Loading movie...</div>;
    } else {
      if (loadingError) {
        return (
          <div>
            Something went wrong while trying to load the movie details. Please
            try again.
          </div>
        );
      } else {
        return <NoMovieFound />;
      }
    }
  }
}

export default MoviePage;
