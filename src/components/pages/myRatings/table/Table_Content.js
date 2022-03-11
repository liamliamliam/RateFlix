import React from 'react';
import { format } from 'date-fns';
import { Image } from 'antd';
import { parsePosterFile } from '../../../../helpers';
import defaultImage from '../../../../media/default-movie-poster.jpg';

function Table_Content({ items }) {
  const renderItems = () => {
    //console.log('renderItems() - items:', items);
    if (!items.length)
      return (
        <tr>
          <td colSpan={7} className='ta-c'>
            <h2>No Ratings Found!</h2>
          </td>
        </tr>
      );
    return items.map((rating, i) => {
      return (
        <tr key={i}>
          <td style={{ width: 44 }}>
            <Image
              src={parsePosterFile(rating.movie.poster)}
              fallback={defaultImage}
              preview={false}
              style={{ width: 44, height: 70 }}
            />
          </td>
          <td>{rating.movie.title}</td>
          <td className='ta-c'>{rating.score}</td>
          <td className='ta-c'>{rating.movie.vote_average}</td>
          <td className='ta-c'>
            {format(new Date(rating.movie.release_date), 'yyyy')}
          </td>
          <td className='ta-r'>
            {format(new Date(rating.dateModified), 'MMM do yyyy @ hh:mm')}
          </td>
          <td className='ta-r'>
            {format(new Date(rating.dateCreated), 'MMM do yyyy @ hh:mm')}
          </td>
        </tr>
      );
    });
  };

  return <tbody>{renderItems()}</tbody>;
}

export default Table_Content;
