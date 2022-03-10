import {configureMockStore} from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event/dist';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Route, Router, Routes} from 'react-router-dom';
import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {AppRoute, AuthStatus} from '../../consts';
import {createAPI} from '../../servises/api';
import {State} from '../../types/store';
import MoviePage from '../movie-page/movie-page';
import Player from './player';

const navigator = createMemoryHistory();
const api = createAPI(jest.fn());
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State,
  Action,
  ThunkDispatch<State, typeof api, Action>>(middlewares);
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
const store = mockStore({
  user: user,
  data: data,
});

describe('Component: Player', () => {
  it('should render correctly', () => {
    navigator.push('/player/1');

    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Player/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(data.film.name, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId('videoPlayer')).toBeInTheDocument();
    expect(container.querySelector('.player__progress')).toBeInTheDocument();
    expect(container.querySelector('.player__toggler')).toBeInTheDocument();
    expect(container.querySelector('.player__time-value')).toBeInTheDocument();
    expect(container.querySelector('.player__play')).toBeInTheDocument();
    expect(container.querySelector('.player__full-screen')).toBeInTheDocument();
  });

  it('should navigate to film when exit will click', () => {
    navigator.push('/film/1');
    navigator.push('/player/1');
    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.MoviePage} element={<MoviePage/>}/>
            <Route path={AppRoute.Player} element={<Player/>}/>
          </Routes>
        </Router>
      </Provider>
    );

    userEvent.click(screen.getByText(/Exit/i));
    expect(navigator.location.pathname).toBe('/film/1');

    // screen.debug()
  });

  it('should play film when play will click', () => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();

    navigator.push('/player/1');
    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <Routes>
            <Route path={AppRoute.Player} element={<Player/>}/>
          </Routes>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('buttonPlayPause'));
    expect(screen.getByText(/Pause/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId('buttonPlayPause'));
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    // screen.debug()
  });
});
