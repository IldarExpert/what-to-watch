import {configureMockStore} from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event/dist';
import {createMemoryHistory} from 'history';
import React from 'react';
import * as Redux from 'react-redux';
import {Provider} from 'react-redux';
import {Route, Router, Routes} from 'react-router-dom';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import PrivateRoute from '../../components/private-route/private-route';
import {AppRoute, AuthStatus} from '../../consts';
import {createAPI} from '../../servises/api';
import {State} from '../../types/store';
import MoviePage from '../movie-page/movie-page';
import AddReview from './add-review';

const navigator = createMemoryHistory();
const api = createAPI(jest.fn());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State,
  Action,
  ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Page: AddReview', () => {
  beforeEach(() => {
    navigator.push('/films/3/review');
  });

  it('should redirect when authStatus is not auth', () => {
    const store = mockStore({
      user: {
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
      },
      data: {
        filmList: [{
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
        film: {
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
        },
        isLoading: false,
        similarFilms: [{
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
        comments: [{
          "id": 1,
          "user": {
            "id": 4,
            "name": "Kate Muir"
          },
          "rating": 8.9,
          "comment": "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
          "date": "2019-05-08T14:13:56.569Z"
        }],
        commentsError: null,
        promoFilm: {
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
        },
      }
    });

    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Public Route</h1>}/>
            <Route path={AppRoute.AddReview} element={
              <PrivateRoute>
                <AddReview/>
              </PrivateRoute>
            }/>
          </Routes>
        </Router>
      </Provider>
    );

    expect(container.querySelector('.add-review')).toBeNull();
  });

  it('should render correctly when is not correct form value', () => {
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
      },
      data: {
        filmList: [{
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
        film: {
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
        },
        isLoading: false,
        similarFilms: [{
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
        comments: [{
          "id": 1,
          "user": {
            "id": 4,
            "name": "Kate Muir"
          },
          "rating": 8.9,
          "comment": "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
          "date": "2019-05-08T14:13:56.569Z"
        }],
        commentsError: null,
        promoFilm: {
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
        },
      }
    });

    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Public Route</h1>}/>
            <Route path={AppRoute.AddReview} element={
              <PrivateRoute>
                <AddReview/>
              </PrivateRoute>
            }/>
          </Routes>
        </Router>
      </Provider>
    );

    // console.log(navigator.location);
    // screen.debug()
    expect(container.querySelector('.add-review')).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Rating/i)).toHaveLength(10);
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();


    userEvent.type(screen.getByPlaceholderText(/Review text/i), 'review text review text review text review text review text review text review text review');
    expect(container.querySelector('.add-review__btn')?.getAttribute('disabled')).toBe('');

    fireEvent.change(screen.getByPlaceholderText(/Review text/i), {target: {value: ''}})
    userEvent.click(screen.getByRole('radio', {name: 'Rating 9'}));
    expect(container.querySelector('.add-review__btn')?.getAttribute('disabled')).toBe('');

    userEvent.type(screen.getByPlaceholderText(/Review text/i), 'review text review text review text review text review text review text review text review');
    userEvent.click(screen.getByRole('radio', {name: 'Rating 9'}));
    expect(container.querySelector('.add-review__btn')?.getAttribute('disabled')).toBeNull();

    // screen.debug()
    // screen.getByRole('')
  });

  it('should dispatch when form submit', () => {
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
      },
      data: {
        filmList: [{
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
        film: {
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
        },
        isLoading: false,
        similarFilms: [{
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
        comments: [{
          "id": 1,
          "user": {
            "id": 4,
            "name": "Kate Muir"
          },
          "rating": 8.9,
          "comment": "Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.",
          "date": "2019-05-08T14:13:56.569Z"
        }],
        commentsError: null,
        promoFilm: {
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
        },
      }
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>Public Route</h1>}/>
            <Route path={AppRoute.MoviePage} element={<MoviePage/>}/>
            <Route path={AppRoute.AddReview} element={
              <PrivateRoute>
                <AddReview/>
              </PrivateRoute>
            }/>
          </Routes>
        </Router>
      </Provider>
    );

    userEvent.type(screen.getByPlaceholderText(/Review text/i), 'review text review text review text review text review text review text review text review');
    userEvent.click(screen.getByRole('radio', {name: 'Rating 9'}));
    userEvent.click(screen.getByText(/Post/i));

    // screen.debug()
  });
});
