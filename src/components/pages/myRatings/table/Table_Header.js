import React from 'react';
import { Button } from '@blueprintjs/core';

function Table_Header({ sort, set_sort }) {
  const arrow = field =>
    sort.field == field ? (sort.asc ? 'arrow-up' : 'arrow-down') : '';
  const handleClick = field => {
    set_sort({
      field,
      asc: sort.field == field ? !sort.asc : true
    });
  };
  return (
    <thead>
      <tr>
        <th></th>
        <th className='ta-l'>
          <Button
            small
            minimal
            text='Title'
            rightIcon={arrow('title')}
            onClick={() => handleClick('title')}
          />
        </th>
        <th>
          <Button
            small
            minimal
            text='Your Score'
            rightIcon={arrow('score')}
            onClick={() => handleClick('score')}
          />
        </th>
        <th>
          <Button
            small
            minimal
            text='Average'
            rightIcon={arrow('vote_average')}
            onClick={() => handleClick('vote_average')}
          />
        </th>
        <th>
          <Button
            small
            minimal
            text='Year'
            rightIcon={arrow('year')}
            onClick={() => handleClick('year')}
          />
        </th>
        <th className='ta-r'>
          <Button
            small
            minimal
            text='Date Last Modified'
            rightIcon={arrow('dateModified')}
            onClick={() => handleClick('dateModified')}
          />
        </th>
        <th className='ta-r'>
          <Button
            small
            minimal
            text='Date Created'
            rightIcon={arrow('dateCreated')}
            onClick={() => handleClick('dateCreated')}
          />
        </th>
      </tr>
    </thead>
  );
}

export default Table_Header;
