import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from '@blueprintjs/core';
import { DateRangePicker } from '@blueprintjs/datetime';
import { Popover2 } from '@blueprintjs/popover2';

function DateRange_Filter({ date_range, onChange, title }) {
  const [date_created_range, set_date_created_range] = useState(date_range);
  const date_format = 'MMM do yyyy';
  useEffect(() => {
    if (date_created_range[0] && date_created_range[1])
      onChange(date_created_range);
  }, [date_created_range]);
  return (
    <div>
      <div className='rf-myratings-filter-title'>{title || 'Date'}:</div>
      <Popover2
        placement='bottom-end'
        content={
          <div style={{ padding: '4px 4px' }}>
            <DateRangePicker
              value={date_created_range}
              onChange={dates => set_date_created_range(dates)}
            />
          </div>
        }
      >
        <Button
          small
          minimal
          text={`${format(date_range[0], date_format)} - ${format(
            date_range[1],
            date_format
          )}`}
        />
      </Popover2>
    </div>
  );
}

export default DateRange_Filter;
