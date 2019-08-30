export const RESET_GAME_STATE = 'RESET_GAME_STATE';
export const SETUP_NEXT_SYLLABLE = 'SETUP_NEXT_SYLLABLE';
export const SET_GIVEN_ANSWER = 'SET_GIVEN_ANSWER';

export const resetGameState = () => ({
  type: RESET_GAME_STATE
});

export const setupNextSyllable = (selectedKana, selectedLevel) => ({
  type: SETUP_NEXT_SYLLABLE,
  selectedKana,
  selectedLevel
});

export const setGivenAnswer = givenAnswer => ({
  type: SET_GIVEN_ANSWER,
  givenAnswer
});
