import game, { gameStoreType } from './gameStore';
import persisted, { persistedStoreType } from './persistedStore';

export interface globalStore {
  game: gameStoreType;
  persisted: persistedStoreType;
}

export default {
  game,
  persisted
};
