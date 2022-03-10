import {configureMockStore} from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {AuthStatus, FILM_PER_PAGE} from '../../consts';
import FilmCatalog from './film-catalog';

const navigator = createMemoryHistory();
const mockStore = configureMockStore();
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


describe('Component: FilmCatalog', () => {


  it('should dont show "Show more" when films less than in 1 page', () => {
    const filmList = [{
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
    },];
    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmCatalog filmList={filmList}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.queryByText(/Show more/i)).toBeNull();
  });

  it('should show "Show more" when films more than in 1 page', () => {
    let result: any = []
    for (let i = 0; i <= FILM_PER_PAGE + 1; i++) {
      const filmList = [{
        "id": i,
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
      },];
      result = [...result, ...filmList];
    }

    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmCatalog filmList={result}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});
