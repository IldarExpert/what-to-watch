import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {Route, Router, Routes} from 'react-router-dom';
import Header from './header';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {AppRoute, AuthStatus} from '../../consts';
import SignIn from '../../pages/sign-in/sign-in';
import {createAPI} from '../../servises/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {State} from '../../types/store';
import {Action} from 'redux';
import * as Redux from 'react-redux';

const navigator = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({
  user: {
    authorizationStatus: AuthStatus.Unknown,
    userInfo: {
      "id": 1,
      "email": "Oliver.conner@gmail.com",
      "name": "Oliver.conner",
      "avatarUrl": "img/1.png",
      "token": "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20="
    },
  }
});

describe('Component: Header', () => {
  it('should render correctly when pathname = "AppRoute.MyList" and is AuthStatus.NoAuth', () => {
    navigator.replace(AppRoute.MyList);
    const store = mockStore({
      user: {
        authorizationStatus: AuthStatus.NoAuth,
      }
    });

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<SignIn/>}/>
            <Route path={AppRoute.MyList} element={<Header/>}/>
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByTestId('SignInLink')).toBeInTheDocument();
  });

  it('should render correctly when pathname = "AppRoute.MyList" and is AuthStatus.Auth', () => {
    navigator.replace(AppRoute.MyList);
    const store = mockStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
        userInfo: {
          "id": 1,
          "email": "Oliver.conner@gmail.com",
          "name": "Oliver.conner",
          "avatarUrl": "img/1.png",
          "token": "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20="
        },
      }
    });

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Header/>
        </Router>
      </Provider>
    );

    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(screen.getByText('T')).toBeInTheDocument();

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render correctly when pathname = "AppRoute.SignIn"', () => {
    navigator.replace(AppRoute.SignIn);

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Header/>
        </Router>
      </Provider>
    );

    expect(screen.getAllByText('W')).toHaveLength(2);
    expect(screen.getByText('T')).toBeInTheDocument();

    expect(screen.getByTestId('SignInH1')).toBeInTheDocument();
    expect(screen.queryByTestId('SignInLink')).toBeNull();
    expect(screen.queryByText('Sign out')).toBeNull();
  });

  it('should dispatch requireLogOut() when click to link Sign out', () => {
    navigator.replace(AppRoute.Main);
    const api = createAPI(jest.fn());
    const middlewares = [thunk.withExtraArgument(api)];

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);


    const mockStore = configureMockStore<State,
      Action,
      ThunkDispatch<State, typeof api, Action>>(middlewares);

    let store = mockStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
        userInfo: {
          "id": 1,
          "email": "Oliver.conner@gmail.com",
          "name": "Oliver.conner",
          "avatarUrl": "img/1.png",
          "token": "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20="
        },
      }
    });

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Header/>
        </Router>
      </Provider>
    );

    expect(screen.queryByText(/Sign in/i)).toBeNull();

    store = mockStore({
      user: {
        authorizationStatus: AuthStatus.NoAuth,
        userInfo: {
          "id": 1,
          "email": "Oliver.conner@gmail.com",
          "name": "Oliver.conner",
          "avatarUrl": "img/1.png",
          "token": "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20="
        },
      }
    });

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Header/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
