import React from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../consts';

const PrivateRoute = ({children}: {children: JSX.Element}) => {
  let auth = AuthStatus.Auth;
  console.log('auth', auth);

  if (auth !== AuthStatus.Auth) {
    return <Navigate to={AppRoute.SignIn} />
  }
  return children;
};

export default PrivateRoute;
