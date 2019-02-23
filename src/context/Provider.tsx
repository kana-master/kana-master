import * as React from 'react';
import _ from 'lodash';
import defaultStores from './defaultStores';
import actions from './actions';
import { getPersistedStore, defaultPersistedStore } from './persist';

export const AppContext = React.createContext({
  stores: defaultStores,
  actions: {}
});

export default class Provider extends React.Component {
  state: any = { ...defaultStores };

  async componentDidMount() {
    const persistedStore = _.merge(
      { ...defaultPersistedStore },
      await getPersistedStore()
    );

    this.setState({ ...defaultStores, persistedStore });
  }

  connectedActions = _.mapValues(actions, (category, categoryName) =>
    _.mapValues(category, (action: any) => (...args) =>
      this.setState((previousState, currentProps) =>
        action(previousState[categoryName], ...args)
      )
    )
  );

  /*
  connectedActions = {gameActions: actions.game}?
  */

  render() {
    return (
      // @TODO: render loading screen when state is empty
      !_.isEmpty(this.state) && (
        <AppContext.Provider
          value={{
            stores: this.state,
            actions: this.connectedActions
          }}
        >
          {this.props.children}
        </AppContext.Provider>
      )
    );
  }
}
