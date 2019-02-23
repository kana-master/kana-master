import game, { gameStoreProps } from './gameStore';
import { defaultPersistedStore } from '../persist';

export interface globalStore {
  game: gameStoreProps,
  persisted: any
} 

export default {
  game,
  persisted: defaultPersistedStore
};
