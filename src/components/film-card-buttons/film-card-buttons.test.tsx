import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute, AuthStatus} from '../../consts';
import {Route, Router, Routes} from 'react-router-dom';
import Footer from '../footer/footer';
import {Provider} from 'react-redux';
import SignIn from '../../pages/sign-in/sign-in';
import Header from '../header/header';
import React from 'react';
import {createMemoryHistory} from 'history';
import FilmCardButtons from './film-card-buttons';

const mockStore = configureMockStore();
const navigator = createMemoryHistory();


describe('Component: FilmCardButtons', () => {
  it('should render correctly when pathname is AppRoute.Main', () => {
    navigator.push(AppRoute.Main);
    const filmData = {
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
    };
    const store = mockStore({
      user: {
        authorizationStatus: AuthStatus.Unknown,
      },
      data: {
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

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmCardButtons filmData={filmData}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add review/i)).toBeNull();

  });

  it('should render correctly when pathname is AppRoute.MoviePage and user is auth', () => {
    navigator.push(AppRoute.MoviePage);
    const filmData = {
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
    };
    const store = mockStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
      },
      data: {
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

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmCardButtons filmData={filmData}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render correctly when pathname is AppRoute.MoviePage and user is noAuth(unknown)', () => {
    navigator.push(AppRoute.MoviePage);
    const filmData = {
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
    };
    const store = mockStore({
      user: {
        authorizationStatus: AuthStatus.NoAuth,
      },
      data: {
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

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmCardButtons filmData={filmData}/>
        </Router>
      </Provider>
    );

    expect(screen.queryByText(/Add review/i)).toBeNull();
  });

  it('should render correctly when film is favorite ', () => {
    let filmData = {
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
      "isFavorite": true
    };
    const store = mockStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
      },
      data: {
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
          "isFavorite": true
        },
      }
    });

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmCardButtons filmData={filmData}/>
        </Router>
      </Provider>
    );

    expect(screen.getByTestId('inList')).toBeInTheDocument();
    expect(screen.queryByTestId('add')).toBeNull();
  });

  it('should render correctly when film is not favorite', () => {
    const filmData = {
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
    };
    const store = mockStore({
      user: {
        authorizationStatus: AuthStatus.Auth,
      },
      data: {
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
          "isFavorite": true
        },
      }
    });

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmCardButtons filmData={filmData}/>
        </Router>
      </Provider>
    );

    expect(screen.getByTestId('add')).toBeInTheDocument();
    expect(screen.queryByTestId('inList')).toBeNull();
  });
});
