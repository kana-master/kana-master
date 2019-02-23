import * as React from 'react';
import { AppContext } from './Provider';
import { globalStore } from './defaultStores';

type connectType = (
  mapStateToProps?: (stores: globalStore) => any,
  mapActionToProps?: (actions: any) => any
) => any;

export const connect: connectType = (
  mapStateToProps = () => null,
  mapActionToProps = () => null
) => Component => props => (
  <AppContext.Consumer>
    {appContext => {
      return (
        <Component
          {...props}
          // both should insert data into props.store and props.actions
          // respectively
          {...mapStateToProps(appContext.stores)}
          {...mapActionToProps(appContext.actions)}
        />
      );
    }}
  </AppContext.Consumer>
);
