import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthStatus} from '../../consts';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import React from 'react';
import {transformRating} from '../../servises/transform-rating';
import FilmCardOverview from './film-card-overview';

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

describe('Component: FilmCardOverview', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmCardOverview filmData={filmData}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${filmData.director}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${filmData.starring[0]}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${filmData.scoresCount}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${filmData.rating}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${transformRating(filmData.rating)}`, 'i'))).toBeInTheDocument();
  });
});
