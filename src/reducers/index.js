import { combineReducers } from 'redux';
import authReducer from './authReducer';
import darkModeReducer from './darkModeReducer';
import showSettingsReducer from './showSettingsReducer'
import searchReducer from './searchReducer';
import searchStringReducer from './searchStringReducer';
import movieReducer from './movieReducer';

export default combineReducers({
  auth: authReducer,
  darkMode: darkModeReducer,
  showSettings: showSettingsReducer,
  search: searchReducer,
  searchString: searchStringReducer,
  movie: movieReducer
});
