import '@testing-library/jest-dom/extend-expect';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event/dist';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {AuthStatus} from '../../consts';
import {createAPI} from '../../servises/api';
import {State} from '../../types/store';
import SignIn from './sign-in';

const navigator = createMemoryHistory();
const api = createAPI(jest.fn());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State,
  Action,
  ThunkDispatch<State, typeof api, Action>>(middlewares);

const user = {
  authorizationStatus: AuthStatus.NoAuth,
  userInfo: {
    "id": 1,
    "email": "Oliver.conner@gmail.com",
    "name": "Oliver.conner",
    "avatarUrl": "img/1.png",
    "token": "T2xpdmVyLmNvbm5lckBnbWFpbC5jb20="
  },
  authErrorMessage: '',
  myList: [{
    "id": 1,
    "name": "The Grand Budapest Hotel",
    "posterImage": "img/the-grand-budapest-hotel-poster.jpg",
    "previewImage": "img/the-grand-budapest-hotel.jpg",
    "backgroundImage": "img/the-grand-budapest-hotel-bg.jpg",
    "backgroundColor": "#ffffff",
    "videoLink": "/",
    "previewVideoLink": "/",
    "description": "In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.",
    "rating": 8.9,
    "scoresCount": 240,
    "director": "Wes Anderson",
    "starring": ["Bill Murray", "Edward Norton", "Jude Law", "Willem Dafoe", "Saoirse Ronan"],
    "runTime": 99,
    "genre": "Comedy",
    "released": 2014,
    "isFavorite": false
  }],
};
const data = {
  isLoading: false,
};
const store = mockStore({
  user: user,
  data: data,
});

describe('Page: SignIn', () => {
  it('should render correctly', () => {
    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <SignIn/>
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId('signInSubmitButton')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('userEmail'), 'loginUserEmail');
    userEvent.type(screen.getByTestId('userPassword'), 'userPassword');

    expect(screen.getByDisplayValue('loginUserEmail')).toBeInTheDocument();
    expect(screen.getByDisplayValue('userPassword')).toBeInTheDocument();
  });
});
