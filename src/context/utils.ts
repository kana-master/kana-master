// import _ from 'lodash';
// import { AsyncStorage } from 'react-native';

// export const createState = (stores, persistedStore) => {
//   return _.mapValues(stores, store => store(persistedStore));
// };

// export const initPersistedStore = async () => {
//   try {
//     const value = await getPersistedStore();

//     return {
//       level: 1,
//       ...value
//     };
//   } catch (error) {
//     console.warn(error);
//   }
// };

// export const getPersistedStore = async () => {
//   try {
//     return JSON.parse(await AsyncStorage.getItem('persistedStore')) || {};
//   } catch (error) {
//     console.warn(error);
//   }
// };

// export const clearPersistedStore = async () => {
//   try {
//     await AsyncStorage.removeItem('persistedStore');
//   } catch (error) {
//     console.warn(error);
//   }
// };

// export const setPersistedStore = async data => {
//   try {
//     const persistedStore = await getPersistedStore();
//     const newPersistedStore = JSON.stringify(_.merge(persistedStore, data));

//     AsyncStorage.setItem('persistedStore', newPersistedStore);
//   } catch (error) {
//     console.log(error);
//   }
// };
