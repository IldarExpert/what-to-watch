import {configureMockStore} from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Route, Router, Routes} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../consts';
import PrivateRoute from './private-route';

const navigator = createMemoryHistory();
const mockStore = configureMockStore();


describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    navigator.push('/private');
  });

  it('should render children when authStatus is auth', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
      },
      data: {
        isLoading: false,
      }
    });

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Public Route</h1>}/>
            <Route path='/private' element={
              <PrivateRoute>
                <h1>Private Route</h1>
              </PrivateRoute>
            }/>
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).toBeNull();
  });

  it('should redirect to AppRoute.SignIn when authStatus is not auth', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthStatus.NoAuth,
      },
      data: {
        isLoading: false,
      }
    });

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Public Route</h1>}/>
            <Route path='/private' element={
              <PrivateRoute>
                <h1>Private Route</h1>
              </PrivateRoute>
            }/>
          </Routes>
        </Router>
      </Provider>
    );

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Public Route</h1>}/>
            <Route path='/private' element={
              <PrivateRoute>
                <h1>Private Route</h1>
              </PrivateRoute>
            }/>
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.queryByText(/Private Route/i)).toBeNull();
    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
  });
});
