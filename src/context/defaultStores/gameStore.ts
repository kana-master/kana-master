export interface gameStoreType {
  initialized: boolean;
  correctAnswer: string;
  givenAnswer: string;
  choices: string[];
  score: number;
  lives: number;
  level: number;
  levelGoal: number;
}

export default {
  initialized: false,
  correctAnswer: null,
  givenAnswer: null,
  choices: [],
  score: 0,
  lives: 3,
  level: 1,
  levelGoal: null
};
