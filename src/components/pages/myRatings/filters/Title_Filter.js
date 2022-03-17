import React, { useState } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

function Title_Filter({ query, onChange }) {
  const [info_open, set_info_open] = useState(false);

  return (
    <div>
      <div className='rf-myratings-filter-title'>Title:</div>
      <InputGroup
        small
        value={query}
        placeholder='Search'
        onChange={e => onChange(e.currentTarget.value)}
        rightElement={
          <Popover2
            isOpen={info_open}
            autoFocus={false}
            placement='bottom'
            content={
              <div
                className='bp3-text-small'
                style={{ padding: 8, paddingLeft: 0 }}
              >
                <ul style={{ marginBottom: 0, paddingLeft: 24 }}>
                  <li>Case insensitive</li>
                  <li>Activates with 3 or more characters</li>
                </ul>
              </div>
            }
          >
            <Button
              small
              minimal
              icon='help'
              onMouseEnter={() => set_info_open(true)}
              onMouseLeave={() => set_info_open(false)}
            />
          </Popover2>
        }
      />
    </div>
  );
}

export default Title_Filter;
