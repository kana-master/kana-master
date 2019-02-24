import _ from 'lodash';
import { AsyncStorage } from 'react-native';
import JSON5 from 'json5';
import defaultPersistedStore from '../defaultStores/persistedStore';

export interface persistedActionsType {
  getPersistedStore: () => any;
  setPersistedStore: (arg1: any, arg2: any) => any;
  clearPersistedStore: () => any;
}

const persistedActions: persistedActionsType = {
  getPersistedStore: async () => {
    return JSON5.parse(await AsyncStorage.getItem('persistedStore')) || {};
  },

  setPersistedStore: (state, newData) => {
    AsyncStorage.getItem('persistedStore')
      .then(currentData => {
        const newPersistedStore = JSON5.stringify(
          _.merge(JSON5.parse(currentData), newData)
        );
        AsyncStorage.setItem('persistedStore', newPersistedStore);
      })
      .catch(err => console.warn(err));

    return {
      persisted: {
        ...state,
        ...newData
      }
    };
  },

  clearPersistedStore: () => {
    AsyncStorage.setItem(
      'persistedStore',
      JSON5.stringify(defaultPersistedStore)
    )
      .then(a => {
        console.log(a);
      })
      .catch(err => console.warn(err));

    return {
      persistedStore: {
        ...defaultPersistedStore
      }
    };
  }
};

export default persistedActions;
