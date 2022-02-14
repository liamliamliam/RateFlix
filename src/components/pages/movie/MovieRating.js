import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, TextArea, Button, Intent } from '@blueprintjs/core';
import { Row, Col, Rate } from 'antd';
import * as actions from '../../../actions';
import { AppToaster } from '../../../Toaster';
import { setTheme } from '../../../helpers';

function MovieRating({ movie }) {
  const dispatch = useDispatch();
  const { auth, darkMode } = useSelector(state => state);
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const handleSave = async () => {
    try {
      setSaving(true);
      await dispatch(actions.saveRating({
        movie_id: movie.id,
        user_id: auth._id,
        score,
        notes
      }));
      setSaving(false);
      AppToaster.show({ message: 'Your rating has been saved', intent: Intent.SUCCESS });
    } catch (err) {
      setSaving(false);
    }
  };
  useEffect(() => {
    if (movie.rating) {
      setScore(movie.rating.score);
      setNotes(movie.rating.notes);
    }
    return () => {
      setScore(0);
      setNotes('');
    }
  }, []);
  return (
    <div className='rf-movie-rating-container'>
      <Row>
        <Col span={20}>
          <span className='rf-movie-rating-title'>
            Your Rating: 
          </span>
          <Rate
            className='rf-movie-rate'
            allowHalf
            count={10}
            value={score}
            onChange={v => setScore(v)}
          />
        </Col>
        <Col span={4} style={{ textAlign: 'right' }}>
          {!!score && <Button loading={saving} onClick={handleSave}>
            Save
          </Button>}
        </Col>
      </Row>
      {!!score && <Row>
        <Col span={24}>
          <TextArea
            large
            fill
            value={notes}
            rows={6}
            maxLength={10000}
            placeholder={`Add your thoughts on ${movie.title}`}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Col>
      </Row>}
    </div>
  );
}

export default MovieRating;
