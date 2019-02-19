export const getChoices = (syllables: string[]): string[] => {
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

/**  recalculate hearts depending on answer */
export const updateHearts = (lives: number, isGivenAnswerCorrect: boolean): number => {
  return isGivenAnswerCorrect ? lives : lives - 1;
};

/** recalculate score depending on answer */
export const updateScore = (score: number, isGivenAnswerCorrect: boolean): number => {
  return isGivenAnswerCorrect ? score + 1 : score;
};
