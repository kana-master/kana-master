import {
  UPDATE_UNLOCKED_LEVEL,
} from '../actions';

const initialState = {
  unlockedLevel: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_UNLOCKED_LEVEL:
      return {
        unlockedLevel: action.unlockedLevel
      }
    default:
      return state;
  }
};
