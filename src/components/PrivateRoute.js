import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { storageActions } from './../_helpers';

// HOC for creating private routes
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    storageActions.getFromStorage()
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
  )} />
)