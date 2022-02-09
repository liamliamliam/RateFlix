import React from 'react';
import { useSelector } from 'react-redux';
import { setTheme } from '../../../helpers';

function HomePage() {
  const { darkMode } = useSelector(state => state);
  return (
    <div>
      <h1 className={`${setTheme(darkMode)}`}>Home Page</h1>
    </div>
  );
}

export default HomePage;