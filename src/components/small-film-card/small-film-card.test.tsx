import {screen, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import React from 'react';
import SmallFilmCard from './small-film-card';
import {AppRoute} from '../../consts';

const navigator = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});
const film = {
  "id": 1,
    "name": "The Grand Budapest Hotel",
    "posterImage": "img/the-grand-budapest-hotel-poster.jpg",
    "previewImage": "img/the-grand-budapest-hotel.jpg",
    "backgroundImage": "img/the-grand-budapest-hotel-bg.jpg",
    "backgroundColor": "#ffffff",
    "videoLink": "/",
    "previewVideoLink": "/previewVideoLink",
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

describe('Component: SmallFilmCard', () => {
  it('should render correctly when videoPreview is not empty', () => {
    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <SmallFilmCard
            filmId={film.id}
            filmImage={film.posterImage}
            filmName={film.name}
            videoPreview={film.previewVideoLink}
          />
        </Router>
      </Provider>
    );

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(container.querySelector('a')?.getAttribute('href')).toBe(AppRoute.OneMoviePage + '/' + film.id);
    expect(container.querySelector('video')?.getAttribute('src')).toBe(film.previewVideoLink);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('should render correctly when videoPreview is empty', () => {
    const {container} = render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <SmallFilmCard
            filmId={film.id}
            filmImage={film.posterImage}
            filmName={film.name}
          />
        </Router>
      </Provider>
    );

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(container.querySelector('a')?.getAttribute('href')).toBe(AppRoute.OneMoviePage + '/' + film.id);
    expect(container.querySelector('img')?.getAttribute('src')).toBe(film.posterImage);
    expect(container.querySelector('video')).not.toBeInTheDocument();
  });
});
