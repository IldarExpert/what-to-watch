import React from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../consts';
import {useSelector} from 'react-redux';
import {getAuthStatus} from '../../store/user-reducer/selectors';
import {getIsLoading} from '../../store/data-reducer/selectors';

const PrivateRoute = ({children}: {children: JSX.Element}) => {
  const authStatus = useSelector(getAuthStatus);
  const isLoading = useSelector(getIsLoading);

  if (!isLoading) {
    if (authStatus !== AuthStatus.Auth) {
      return <Navigate to={AppRoute.SignIn} />
    }
  }

  return children;
};

export default PrivateRoute;
