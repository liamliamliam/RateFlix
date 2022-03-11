import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Button, HTMLSelect } from '@blueprintjs/core';

import { Popover2 } from '@blueprintjs/popover2';

function Year_Filter({ onChange }) {
  const [min, set_min] = useState(1900);
  const [max, set_max] = useState(new Date().getFullYear());
  const renderYears = (from, to) => {
    const options = [];
    for (let i = to || new Date().getFullYear(); i > (from || 1900) - 1; i--) {
      options.push(<option key={i}>{i}</option>);
    }
    return options;
  };
  useEffect(() => {
    if (min > max) set_max(min);
    if (max < min) set_min(max);
    onChange([min, max]);
  }, [min, max]);
  return (
    <div>
      <div className='rf-myratings-filter-title'>
        Year:
      </div>
      <Popover2
        placement='bottom-end'
        content={
          <div style={{ padding: '8px 16px' }}>
            Released between:
            <div style={{ display: 'flex', margin: '8px 0 8px' }}>
              <div style={{ marginRight: 8 }}>
                <HTMLSelect value={min} onChange={e => set_min(e.currentTarget.value)}>
                  <option disabled>
                    From
                  </option>
                  {renderYears(null, max)}
                </HTMLSelect>
              </div>
              <div>
                <HTMLSelect value={max} onChange={e => set_max(e.currentTarget.value)}>
                  <option disabled>
                    To
                  </option>
                  {renderYears(min)}
                </HTMLSelect>
              </div>
            </div>

          </div>
        }
      >
        <Button small minimal text={`${min} - ${max}`} />
      </Popover2>
    </div>
  );
}

export default Year_Filter;
