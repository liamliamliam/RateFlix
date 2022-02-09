import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { Row, Col, Image } from 'antd';
import { Tag, Button, Classes } from '@blueprintjs/core';
import { setTheme } from '../../../helpers';
import defaultImage from '../../../media/default-movie-poster.jpg';
import imdbLogo from '../../../media/IMDB_Logo_2016.svg';

import MovieDetails from './MovieDetails';
import MovieRating from './MovieRating';

function MoviePage(props) {
  const dispatch = useDispatch();
  const { imdbId } = useParams();
  const { auth, darkMode } = useSelector((state) => state);
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [movie, setMovie] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [showRatingForm, setShowRatingForm] = useState(false);
  console.log('MoviePage - auth:', auth);
  const loadUserRating = async () => {
    const res = await axios.get(`/api/rating/${imdbId}/${auth._id}`);
    console.log('MoviePage - loadUserRating() - res:', res);
    if (res.data) {
      setUserRating(res.data);
      setShowRatingForm(true);
    }
  };
  const loadMovie = async () => {
    try {
      setLoadingMovie(true);
      const res = await axios.get(`/api/movie/${imdbId}`);
      console.log('MoviePage - loadMovie() - res:', res);
      if (!!res.data.Response) {
        setMovie(res.data);
        loadUserRating();
      }
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
      setUserRating(null);
      setShowRatingForm(false);
    };
  }, [auth]);

  if (movie) {
    return (
      <div
        className={`${setTheme(darkMode)} rf-movie-container`}
        style={{ width: '100%' }}
      >
        <Row gutter={16}>
          <Col xs={24} md={8} xl={4}>
            <div className={loadingMovie ? Classes.SKELETON : ''}>
              <Image
                src={movie.Poster}
                fallback={defaultImage}
                className={`${Classes.SKELETON} rf-movie-poster`}
                preview={false}
              />
            </div>
          </Col>
          <Col xs={24} md={16} xl={20}>
            <Row>
              <Col span={18}>
                <h1 className={`${setTheme(darkMode)} rf-movie-title`}>
                  {movie.Title}
                  <Tag minimal>{movie.Year}</Tag>
                </h1>
              </Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                <Button
                  className='rf-movie-imdb-logo'
                  onClick={() => {
                    window.open(`https://www.imdb.com/title/${movie.imdbID}/`);
                  }}
                >
                  <img src={imdbLogo} />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <MovieDetails movie={movie} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button fill onClick={() => setShowRatingForm(!showRatingForm)}>
              {showRatingForm ? 'Cancel' : 'Rate'}
            </Button>
          </Col>
        </Row>
        {showRatingForm && (
          <Row>
            <Col span={24}>
              <MovieRating movie={movie} userRating={userRating} />
            </Col>
          </Row>
        )}
      </div>
    );
  } else {
    if (loadingMovie) {
      return (
        <div>
          Loading movie...
        </div>
      )
    } else {
      if (loadingError) {
        return (
          <div>
            Something went wrong while trying to load the movie details. Please try
            again.
          </div>
        );
      } else {
        return (
          <div>
            No movie found.
          </div>
        );
      }
    }
  }
}

export default MoviePage;
