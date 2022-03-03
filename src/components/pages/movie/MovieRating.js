import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextArea, Button, Intent } from '@blueprintjs/core';
import { Row, Col, Rate } from 'antd';
import * as actions from '../../../actions';
import { AppToaster } from '../../../Toaster';

function MovieRating({ movie }) {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const [score, setScore] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const handleSave = async (ratingScore, saveMessage) => {
    try {
      setSaving(true);
      await dispatch(
        actions.saveRating(auth._id, movie, ratingScore || score, notes)
      );
      setSaving(false);
      AppToaster.show({
        message: saveMessage,
        intent: Intent.SUCCESS
      });
    } catch (err) {
      setSaving(false);
    }
  };
  useEffect(() => {
    if (movie.rating) {
      setScore(movie.rating.score);
      setNotes(movie.rating.notes);
      if (movie.rating.notes) setShowNotes(true);
      console.log('NOTES:', notes);
    }
    return () => {
      setScore(0);
      setNotes('');
    };
  }, []);
  return (
    <div className='rf-movie-rating-container'>
      <Row>
        <Col span={16}>
          <span className='rf-movie-rating-title'>Your Rating:</span>
          <Rate
            className='rf-movie-rate'
            allowHalf
            count={10}
            value={score}
            onChange={v => {
              setScore(v);
              handleSave(v, `You rated ${movie.title} with a score of ${v}/10`);
            }}
          />
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          {(!!score || showNotes) && (
            <Button loading={saving} onClick={() => setShowNotes(!showNotes)}>
              {!showNotes ? 'Add Comment' : 'Cancel'}
            </Button>
          )}
          {showNotes && (
            <Button
              intent={Intent.PRIMARY}
              loading={saving}
              onClick={() => handleSave(null, 'Comment saved')}
              style={{ marginLeft: 16 }}
            >
              Save
            </Button>
          )}
        </Col>
      </Row>
      {showNotes && (
        <Row>
          <Col span={24}>
            <TextArea
              large
              fill
              value={notes}
              rows={6}
              maxLength={10000}
              placeholder={`Add your thoughts on ${movie.title}`}
              onChange={e => setNotes(e.target.value)}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default MovieRating;
