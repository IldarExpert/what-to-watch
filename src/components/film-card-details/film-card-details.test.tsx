import {configureMockStore} from '@jedmao/redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {AuthStatus} from '../../consts';
import {convertTime} from '../../servises/convert-time';
import FilmCardDetails from './film-card-details';

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

describe('Component: FilmCardDetails', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmCardDetails filmData={filmData}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(/Director/i)).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(/Released/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${filmData.director}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${filmData.genre}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${convertTime(filmData.runTime)}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${filmData.released}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${filmData.starring[0]}`, 'i'))).toBeInTheDocument();
  });
});
