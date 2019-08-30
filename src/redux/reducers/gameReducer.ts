import _ from 'lodash';
import * as kana from '../../data/kana';
import levels from '../../data/levels';
import { getChoices, updateHearts, updateScore } from '../../utils/logic';
import {
  RESET_GAME_STATE,
  SETUP_NEXT_SYLLABLE,
  SET_GIVEN_ANSWER
} from '../actions';

const initialState = {
  initialized: false,
  correctAnswer: null,
  givenAnswer: null,
  choices: [],
  score: 0,
  lives: 3,
  level: 1,
  levelGoal: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_GAME_STATE:
      return initialState;
    case SETUP_NEXT_SYLLABLE:
      const { selectedKana, selectedLevel } = action;
      const availableSyllables = _.filter(
        kana[selectedKana],
        syllable => syllable.level <= selectedLevel
      );
      const choices = getChoices(availableSyllables);
      const correctAnswer = _.sample(choices);

      return {
        ...state,
        choices,
        correctAnswer,
        levelGoal: levels[selectedLevel - 1].goal,
        level: selectedLevel,
        initialized: true,
        pending: false,
        givenAnswer: null,
        status: 'pending'
      };
    case SET_GIVEN_ANSWER:
      const { givenAnswer } = action;
      const score = updateScore(state.score, givenAnswer.correct);
      const lives = updateHearts(state.lives, givenAnswer.correct);
      const level = state.levelGoal === score ? state.level + 1 : state.level;

      return {
        ...state,
        givenAnswer,
        pending: true,
        earnedGems: [
          { id: 0, value: 2 },
          { id: 1, value: 1 },
          { id: 2, value: 1 },
          { id: 3, value: 1 },
          { id: 4, value: 5 }
        ],
        status: 'spawnGems',
        lives,
        score,
        level
      };
    default:
      return state;
  }
};
