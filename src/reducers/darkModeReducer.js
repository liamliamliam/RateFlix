import { SET_DARK_MODE } from '../actions/types';

export default function reducer(state = true, action) {
  switch(action.type) {
    case SET_DARK_MODE:
      console.log('darkModeReducer - state:', state);
      document.body.classList[state ? 'add' : 'remove']('rf-dark-mode');
      console.log('darkModeReducer - body classList:', document.body.classList);
      return action.payload;
    default:
      return state;
  }
}