import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../consts';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthStatus, getUserInfo} from '../../store/user-reducer/selectors';
import {requireLogOut} from '../../store/api-action';

const Header = () => {
  const {pathname} = useLocation();
  const dispatch = useDispatch()
  const authStatus = useSelector(getAuthStatus);
  const userInfo = useSelector(getUserInfo);

  const currentClassPageHeader = new Map();
  currentClassPageHeader.set(AppRoute.Main, 'film-card__head');
  currentClassPageHeader.set(AppRoute.SignIn, 'user-page__head');
  currentClassPageHeader.set(AppRoute.MyList, 'user-page__head');

  const handleLogOutClick = () => {
    dispatch(requireLogOut());
  }


  return (
    <header
      className={`${currentClassPageHeader.get(pathname)} page-header`}>
      <div className="logo">
        <Link to={AppRoute.Main} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {
        authStatus === AuthStatus.Auth ?
          pathname !== AppRoute.SignIn &&
          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <Link to={AppRoute.MyList}>
                  <img src={userInfo.avatarUrl} alt="User avatar" width="63" height="63"/>
                </Link>
              </div>
            </li>
            <li className="user-block__item">
              <Link onClick={handleLogOutClick} to={''} className="user-block__link">Sign out</Link>
            </li>
          </ul>
          :
          pathname !== AppRoute.SignIn && <div className="user-block">
            <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
          </div>
      }
      {
        pathname === AppRoute.SignIn ?
          <h1 className="page-title user-page__title">Sign in</h1>
          : ''
      }
      {
        pathname === AppRoute.MyList ?
          <h1 className="page-title user-page__title">My list</h1>
          : ''
      }
    </header>

  );
};

export default Header;
