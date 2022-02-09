import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, TextArea, Button, Intent } from '@blueprintjs/core';
import { Row, Col, Rate } from 'antd';
import * as actions from '../../../actions';
import { AppToaster } from '../../../Toaster';
import { setTheme } from '../../../helpers';

function MovieRating({ movie, userRating }) {
  const dispatch = useDispatch();
  const { auth, darkMode } = useSelector(state => state);
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    try {
      setSaving(true);
      await dispatch(actions.saveRating({
        imdbId: movie.imdbID,
        userId: auth._id,
        rating,
        notes
      }));
      setSaving(false);
      AppToaster.show({ message: 'Your rating has been saved', intent: Intent.SUCCESS });
    } catch (err) {
      setSaving(false);
    }
  };
  useEffect(() => {
    if (userRating) {
      setRating(userRating.rating);
      setNotes(userRating.notes);
    }
    return () => {
      setRating(0);
      setNotes('');
    }
  }, []);
  return (
    <Card className={`${setTheme(darkMode)} rf-rating-card`}>
      <Row>
        <Col span={12}>
          <h3 className={`${setTheme(darkMode)}`}>My Rating</h3>
        </Col>
        <Col span={12} style={{ textAlign: 'right', fontSize: 30 }}>
          <Rate
            className='rf-movie-rate'
            allowHalf
            count={10}
            value={rating}
            onChange={(v) => setRating(v)}
            style={{ position: 'relative', top: -13, fontSize: 26 }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TextArea
            large
            fill
            value={notes}
            rows={6}
            maxLength={10000}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button loading={saving} onClick={handleSave}>
            Save
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default MovieRating;
