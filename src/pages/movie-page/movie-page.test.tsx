import {configureMockStore} from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Route, Router, Routes} from 'react-router-dom';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {AppRoute, AuthStatus} from '../../consts';
import {createAPI} from '../../servises/api';
import {State} from '../../types/store';
import MoviePage from './movie-page';

const navigator = createMemoryHistory();
const api = createAPI(jest.fn());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State,
  Action,
  ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Component: MoviePage', () => {
  beforeEach(() => {
    navigator.push('/film/3');
  });

  const data = {
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
      "id": 2,
      "name": "similarFilms",
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
  };
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

  it('should render correctly', () => {
    const store = mockStore({
      user: user,
      data: data
    });

    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.SignIn} element={<h1>SignIn</h1>}/>
            <Route path={AppRoute.AddReview} element={<h1>AddReview</h1>}/>
            <Route path={AppRoute.MoviePage} element={<MoviePage/>}/>
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.getByText(data.film.name)).toBeInTheDocument();
    expect(screen.getByText(data.film.genre)).toBeInTheDocument();
    expect(screen.getByText(data.film.released)).toBeInTheDocument();
    expect(container.querySelector('.film-card__bg')?.firstElementChild?.getAttribute('src')).toBe(data.film.backgroundImage);
  });
});
