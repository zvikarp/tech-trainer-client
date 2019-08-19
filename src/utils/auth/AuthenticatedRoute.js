import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function AuthenticatedRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to={'/'} />}
    />
  );
}