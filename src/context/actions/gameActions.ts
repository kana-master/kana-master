import _ from 'lodash';
import * as kana from '../../data/kana';
import levels from '../../data/levels';
import { getChoices, updateHearts, updateScore } from '../../utils/logic';

/*
  Game Status
  pending = waiting for user to select an answer
  spawnGems = executing the gem spawn animation and addition
*/

export interface gameActionsType {
  resetGameState: (any) => any;
  setupNextSyllable: (arg1: any, arg2: any, arg3: any) => any;
  setGivenAnswer: (arg1: any, arg2: any) => any;
}

const gameActions: gameActionsType = {
  resetGameState: state => ({
    game: {
      ...state,
      lives: 3,
      score: 0
    }
  }),

  setupNextSyllable: (state, selectedKana, selectedLevel) => {
    const availableSyllables = _.filter(
      kana[selectedKana],
      syllable => syllable.level <= selectedLevel
    );
    const choices = getChoices(availableSyllables);
    const correctAnswer = _.sample(choices);

    return {
      game: {
        ...state,
        choices,
        correctAnswer,
        levelGoal: levels[selectedLevel - 1].goal,
        level: selectedLevel,
        initialized: true,
        pending: false,
        givenAnswer: null,
        status: 'pending'
      }
    };
  },

  setGivenAnswer: (state, givenAnswer) => {
    const score = updateScore(state.score, givenAnswer.correct);
    const lives = updateHearts(state.lives, givenAnswer.correct);
    const level = state.levelGoal === score ? state.level + 1 : state.level;

    return {
      game: {
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
      }
    };
  }
};

export default gameActions;
