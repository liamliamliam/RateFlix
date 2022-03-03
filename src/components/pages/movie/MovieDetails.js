import moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';
import { parseLogoFile } from '../../../helpers';

function MovieDetails({ movie }) {
  const getCrew = job => {
    const member = movie.credits.crew.filter(person => person.job === job);
    return member.length ? member[0].name : 'N/A';
  };
  const director = getCrew('Director');
  console.log('MovieDetails - director:', director);
  return (
    <div className='rf-movie-details-container'>
      <div className='rf-movie-details-header'>Genre</div>
      <div className='rf-movie-details-data'>
        {movie.genres.map(genre => genre.name).join(', ')}
      </div>
      <div className='rf-movie-details-header'>Director</div>
      <div className='rf-movie-details-data'>{movie.director}</div>
      <div className='rf-movie-details-header'>Writer</div>
      <div className='rf-movie-details-data'>
        {movie.writer || movie.screenplay}
      </div>
      <div className='rf-movie-details-header'>Released</div>
      <div className='rf-movie-details-data'>
        {moment(movie.release_date).format('dddd, Mo MMMM YYYY')}
      </div>

      <div className='rf-movie-details-header'>Budget</div>
      <div className='rf-movie-details-data'>
        <NumberFormat
          value={movie.budget}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div className='rf-movie-details-header'>Revenue</div>
      <div className='rf-movie-details-data'>
        <NumberFormat
          value={movie.revenue}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'$'}
        />
      </div>
      <div className='rf-movie-details-header'>Production Companies</div>
      <div className='rf-movie-details-data'>
        {movie.production_companies
          .filter(pc => !!pc.logo_path)
          .map(pc => {
            return (
              <img
                src={parseLogoFile(pc.logo_path, 'w92')}
                key={pc.id}
                className='rf-movie-details-pc-logo'
                style={{
                  verticalAlign: 'top',
                  marginTop: '4px',
                  marginRight: '16px'
                }}
              />
            );
          })}
      </div>
    </div>
  );
}

export default MovieDetails;
