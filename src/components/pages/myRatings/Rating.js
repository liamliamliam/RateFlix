import React from 'react';
import { format } from 'date-fns';
import { Image } from 'antd';
import { parsePosterFile } from '../../../helpers';
import defaultImage from '../../../media/default-movie-poster.jpg';

function Rating({ rating }) {
  console.log('Rating:', rating);
  console.log('type:', typeof rating.movie.release_date);
  return (
    <tr key={rating._id}>
      <td>
        <Image 
          src={parsePosterFile(rating.movie.poster)}
          fallback={defaultImage}
          preview={false}
          style={{ width: 80, height: 100 }}
        />
      </td>
      <td>{rating.movie.title}</td>
      <td>{format(new Date(rating.movie.release_date), 'yyyy')}</td>
      <td>{rating.movie.vote_average}</td>
      <td>{rating.score}</td>
    </tr>
  );
}

export default Rating;