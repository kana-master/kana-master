import React from 'react';
import { AppContext } from './Provider';

export const connect = (
  mapStateToProps = () => null,
  mapActionToProps = () => null
) => Component => props => (
  <AppContext.Consumer>
    {appContext => {
      return (
        <Component
          {...props}
          {...mapStateToProps(appContext.state)}
          {...mapActionToProps(appContext.actions)}
        />
      );
    }}
  </AppContext.Consumer>
);
