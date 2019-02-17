import React from 'react';
import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import JSON5 from 'json5';
import stores from './stores';
import actions from './actions';
import { getPersistedStore } from './persist/actions';
import defaultPersistedStore from './persist/store';

export const AppContext = React.createContext();

export default class Provider extends React.Component {
  state = {};

  async componentDidMount() {
    const persistedStore = _.merge(
      { ...defaultPersistedStore },
      await getPersistedStore()
    );

    this.setState({ ...stores, persistedStore });
  }

  connectedActions = _.mapValues(actions, (category, categoryName) => {
    return _.mapValues(category, action => {
      return (...args) =>
        this.setState((previousState, currentProps) => {
          return action(previousState[categoryName], ...args);
        });
    });
  });

  render() {
    return (
      !_.isEmpty(this.state) && (
        <AppContext.Provider
          value={{
            state: this.state,
            actions: this.connectedActions
          }}
        >
          {this.props.children}
        </AppContext.Provider>
      )
    );
  }
}
