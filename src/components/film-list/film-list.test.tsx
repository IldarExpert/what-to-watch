import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import React from 'react';
import FilmList from './film-list';

const navigator = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  data: {
    isLoading: false,
  }
});
const filmList = [
  {
    "id": 1,
    "name": "The Grand Budapest Hotel1",
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
  {
    "id": 2,
    "name": "The Grand Budapest Hotel2",
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
  }
];

describe('Component: FilmList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router navigator={navigator} location={navigator.location}>
          <FilmList filmList={filmList}/>
        </Router>
      </Provider>
    );

    filmList.forEach((el) => {
      expect(screen.getByText(new RegExp(el.name, 'i'))).toBeInTheDocument();
    });

  });
});
