import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import * as actions from '../actions';
import NavBar from './NavBar/NavBar';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import SearchPage from './pages/search/SearchPage';
import MoviePage from './pages/movie/MoviePage';
import MyRatingsPage from './pages/myRatings/MyRatingsPage';
import SettingsDialog from './SettingsDialog';

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);

  useEffect(() => { 
    dispatch(actions.fetchUser());
    if (auth) document.body.classList[auth.darkMode ? 'add' : 'remove']('bp3-dark');
  }, [dispatch]);
  
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:search_string" element={<SearchPage />} />
        <Route path="/myratings" element={<MyRatingsPage />} />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
      <SettingsDialog />
    </div>
  );
}

export default App;
