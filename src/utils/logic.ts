import _ from 'lodash';

export const getChoices = syllables => {
  const choices = [];
  const availableSyllables = [...syllables];

  while (choices.length < 4) {
    const choiceIndex = Math.floor(Math.random() * availableSyllables.length);
    const choice = availableSyllables[choiceIndex];

    availableSyllables.splice(choiceIndex, 1);

    choices.push(choice);
  }

  return choices;
};

export const getHearts = (state, givenAnswer) => {
  return givenAnswer.correct ? state.lives : state.lives - 1;
};

export const updateScore = (state, givenAnswer) => {
  return givenAnswer.correct ? state.score + 1 : state.score;
};
