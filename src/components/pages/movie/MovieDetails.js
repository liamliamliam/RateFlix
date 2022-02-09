import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


function MovieDetails({ movie }) {
  const { darkMode } = useSelector((state) => state);
  return (
    <div className='rf-movie-details-container'>
      <table className='bp3-html-table rf-movie-details'>
        <tbody>
          <tr>
            <th>Plot</th>
            <td>{movie.Plot}</td>
          </tr>
          <tr>
            <th>Cast</th>
            <td>{movie.Actors}</td>
          </tr>
          <tr>
            <th>Genre</th>
            <td>{movie.Genre}</td>
          </tr>
          <tr>
            <th>Director</th>
            <td>{movie.Director}</td>
          </tr>
          <tr>
            <th>Writer</th>
            <td>{movie.Writer}</td>
          </tr>
          <tr>
            <th>Released</th>
            <td>{movie.Released}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MovieDetails;
