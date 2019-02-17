import _ from 'lodash';
import { AsyncStorage } from 'react-native';
import JSON5 from 'json5';
import defaultStore from './store';

export const getPersistedStore = async () => {
  return JSON5.parse(await AsyncStorage.getItem('persistedStore')) || {};
};

export const setPersistedStore = (state, newData) => {
  AsyncStorage.getItem('persistedStore')
    .then(currentData => {
      const newPersistedStore = JSON5.stringify(
        _.merge(JSON5.parse(currentData), newData)
      );
      AsyncStorage.setItem('persistedStore', newPersistedStore);
    })
    .catch(err => console.warn(err));

  return {
    persistedStore: {
      ...state,
      ...newData
    }
  };
};

export const clearPersistedStore = () => {
  AsyncStorage.setItem('persistedStore', JSON5.stringify(defaultStore))
    .then(a => {
      console.log(a);
    })
    .catch(err => console.warn(err));

  return {
    persistedStore: {
      ...defaultStore
    }
  };
};
