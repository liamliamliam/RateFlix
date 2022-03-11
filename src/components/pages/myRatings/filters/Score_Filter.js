import React, { useState } from 'react';
import { Row, Col } from 'antd';
import { Button, RangeSlider } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';

function Score_Filter({ range, onChange }) {
  return (
    <div>
      <div className='rf-myratings-filter-title'>
        Score: 
      </div>
      <Popover2
        placement='bottom-end'
        content={
          <div
            style={{
              padding: '8px 16px'
            }}
          >
            <Row>
              <Col span={24}>Score between:</Col>
            </Row>
            <Row>
              <Col span={24}>
                <RangeSlider
                  min={0}
                  max={10}
                  stepSize={0.5}
                  labelStepSize={5}
                  value={range}
                  onChange={r => onChange(r)}
                />
              </Col>
            </Row>
          </div>
        }
      >
        <Button small minimal text={`${range[0]} - ${range[1]}`} />
      </Popover2>
    </div>
  );
}

export default Score_Filter;
