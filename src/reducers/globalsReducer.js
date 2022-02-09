import { SET_GLOBALS } from '../actions/types';

const defaultGlobals = {
  showSettingsDialog: false,
  darkMode: true
}

export default function searchReducer(state = defaultGlobals, action) {
  switch (action.type) {
    case SET_GLOBALS:
      return {...state, ...action.payload};
    default:
      return state;
  }
}