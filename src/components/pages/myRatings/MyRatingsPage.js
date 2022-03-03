import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import { Menu, MenuItem, Button, RangeSlider } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import './myRatings.css';

import RatingFilter from './RatingFilter';
import Rating from './Rating';

function MyRatingsPage() {
  const [myRatings, setMyRatings] = useState([]);
  const loadMyRatings = async () => {
    const res = await axios.get('/api/myratings');
    setMyRatings(res.data);
  };
  useEffect(() => {
    loadMyRatings();
  }, []);
  const renderMyRatings = () => {
    console.log('renderMyRatings() - myRatings:', myRatings);
    if (!myRatings.length) return (
      <tr>
        <td colSpan={4} className='ta-c'>
          No Ratings Found!
        </td>
      </tr>
    );
    return myRatings.map(rating => <Rating rating={rating} />);
  };
  return (
    <div className='rf-page-container'>
      <Row>
        <Col span={24}>
          <div className='rf-page-title'>My Ratings</div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className='rf-page-section'>
            <Row>
              <Col span={6}>
                <Popover2
                  placement='bottom-end'
                  content={
                    <Menu>
                      <MenuItem text='Rating: High to Low' />
                      <MenuItem text='Rating: Low to High' />
                      <MenuItem text='Movie: Title' />
                      <MenuItem text='Movie: Year' />
                    </Menu>
                  }
                >
                  <Button icon='sort' text='Sort' />
                </Popover2>
              </Col>
              <Col span={6}>
                <h3>Rating</h3>
                <RatingFilter />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default MyRatingsPage;
