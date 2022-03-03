import React, { useState } from 'react';
import { RangeSlider } from '@blueprintjs/core';

export default function RatingFilters() {
  const [scoreRange, setScoreRange] = useState([0, 10]);
  return (
    <RangeSlider
      min={0}
      max={10}
      stepSize={0.5}
      labelStepSize={2}
      value={scoreRange}
      onChange={range => setScoreRange(range)}
    />
  );
}
