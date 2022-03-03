import React from 'react';
import { Button } from '@blueprintjs/core';

function Pagination({ page, total_pages }) {
  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i < (total_pages + 1); i++) {
      const selected = i === page;
      buttons.push(
        <Button 
          large
          outlined
          key={i}
          disabled={selected}
          active={selected}
        >{i}</Button>
      );
    }
    return buttons;
  };
  return (
    <div className='rf-search-pagination-container'>
      {renderButtons()}
    </div>
  );
}

export default Pagination;