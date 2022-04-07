import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Row, Col } from 'antd';
import { Card, H1, H5, Callout } from '@blueprintjs/core';

function HomePage() {
  const { auth } = useSelector(state => state);
  const [stats, set_stats] = useState(null);
  const [loaded, set_loaded] = useState(false);

  const load_stats = async () => {
    const res = await axios.get('/api/stats');
    set_stats(res.data);
  };

  useEffect(() => {
    //load_stats();
  }, []);
  useEffect(() => {
    console.log('Stats changed:', stats);
  }, [stats]);

  return (
    <div className='rf-page-container'>
      <Row>
        <Col span={24}>
          <Callout title='Welcome to RateFlix'>
            I have put together this web application to demonstrate my
            development abilities. Feel free to use this site. However, be
            warned, the data may not always persist.
          </Callout>
        </Col>
      </Row>
      <Row className='gaped'>
        <Col md={4}>
          <Card>
            <H5>Total</H5>
            <H1></H1>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <H5>Last Month</H5>
            <H1></H1>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <H5>Last Week</H5>
            <H1></H1>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
