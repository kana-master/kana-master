import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import progressReducer from './progressReducer';

export default combineReducers({
  game: gameReducer,
  progress: progressReducer
});
